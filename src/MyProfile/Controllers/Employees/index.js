const Employee = require("../../Queries/Employees/index");
const Audit = require("../../Queries/EmployeeAudit");
const tempEmployee = require("../../../TempProfile/Queries/TempraryEmployees");
const {
    DeleteTempEmployeeClientByEmployeeId, InsertTempEmployeeClient,
} = require("../../../TempProfile/Queries/TempraryEmployeeClients");
const {
    DeleteTempEmployeeDomainByEmployeeId,
    InsertEmpDomain
} = require("../../../TempProfile/Queries/TempraryEmployeeDomains");

const { DeleteEmployeeClientByFKId, InsertEmployeeClients, UpdateEmployeeClientById } = require("../../Queries/EmployeeClients");
const EmployeeDomains = require('../../Queries/EmployeeDomains')
const Educations = require('../../Queries/Educations')
const Clients = require('../../Queries/Clients')
const { sendNotification } = require("../../../../config/Mails/MailSender");
const { GetProfileImageById } = require("../../Queries/EmployeeProfiles");
const { GetEmployeeResumeById } = require("../../Queries/EmployeeResume");
const { GetReportedBy } = require("../../../Timesheet/Queries/ProjectAllocation");
const { CheckDesignation, InsertDesignations, GetTheLatestInsertedRecordId } = require("../../Queries/Designations");
const { GeneratePassword, getCapitalized } = require("../../../../config/utils");
const { InsertUserData } = require("../../Queries/Users");
const bcrypt = require('bcrypt')


const GetEmployees = async (req, res) => {
    let data = await Employee.GetEmployees()
    res.status(200).json({ isSuccess: true, empData: data });
}

const GetbyIdEmployee = async (req, res) => {
    let data = await Employee.GetEmployeeById(req.body.id)
    if (data !== undefined) {
        if (data.recordset.length === 0) {
            res.status(200).json({ isSuccess: false });
        } else {
            res.status(200).json({ isSuccess: true, Employee: data.recordset });
        }
    }
}

const GetEmployeeDesignation = async (req, res) => {
    if (req.body.FKEmpId !== null) {
        let result = await Employee.GetEmployeeDesignationById(req.body.FKEmpId);
        res.status(200).json({
            isSuccess: true,
            Designation: result.recordset[0].Designation,
        });
    } else {
        res.status(200).json({ isSuccess: false });
    }
}

const PostEmployee = async (req, res) => {
    await tempEmployee.InsertTempEmployeeData(
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.PhoneNumber,
        req.body.CountryCode,
        req.body.Organization,
        req.body.FK_DesignationId,
        req.body.FK_PracticeAreaId,
        req.body.FK_EducationId,
        req.body.Specialization,
        req.body.Certifications,
        req.body.CareerHighlights,
        req.body.CareerStartDate,
        req.body.FK_EmployeeId,
        req.body.isApprove,
        req.body.Comment,
        req.body.ReportingTo,
        req.body.Location
    );

    // Add the employee in audit
    Audit.InsertEmployeeAudit(
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.PhoneNumber,
        req.body.CountryCode,
        req.body.Organization,
        req.body.FK_DesignationId,
        req.body.FK_PracticeAreaId,
        req.body.FK_EducationId,
        req.body.Specialization,
        req.body.Certifications,
        req.body.CareerHighlights,
        req.body.CareerStartDate,
        req.body.Comment,
        req.body.FK_EmployeeId,
        req.body.UpdatedStatus,
        req.body.Location
    );

    let result = await tempEmployee.GetLatestTempEmployeeId();

    res.status(200).json({ Id: result.recordset[0][""], submitted: true });
}

const UpdateEmployee = async (req, res) => {
    let data = [];
    let temp_data = [];

    if (req.body.Role === "Admin") {
        data = await Employee.UpdateEmployeeById(
            req.body.Id,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.org,
            req.body.countryCode,
            req.body.phoneNumber,
            req.body.designationId,
            req.body.practiceAreaId,
            req.body.educationId,
            req.body.specialization,
            req.body.certifications,
            req.body.careerHighlights,
            req.body.careerStartDate,
            req.body.reportingTo,
            req.body.Location
        );
        // delete the client
        await DeleteEmployeeClientByFKId(req.body.Id);
    }
    else {
        // Need to check if the Temp is already exist, update that instead of creating a new Temp Storage for new Data
        temp_data = await tempEmployee.GetTempEmployeeDataByEmployeeId(
            req.body.FkEmployeeId
        );
        if (temp_data.recordset.length === 0) {
            // if (temp_data === undefined) {
            // Insert new Temp
            tempEmployee.InsertTempEmployeeData(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.phoneNumber,
                req.body.countryCode,
                req.body.org,
                req.body.designationId,
                req.body.educationId,
                req.body.specialization,
                req.body.certifications,
                req.body.careerHighlights,
                req.body.careerStartDate,
                req.body.FkEmployeeId,
                req.body.isApprove,
                req.body.comment,
                req.body.reportingTo,
                req.body.Location
            );

            // get the inserted id back
            data = await tempEmployee.GetLatestTempEmployeeId();
        } else {
            // Update the Same Temp
            data = await tempEmployee.UpdateTempEmployeeData(
                temp_data.recordset[0].Id,
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.phoneNumber,
                req.body.countryCode,
                req.body.org,
                req.body.designationId,
                req.body.educationId,
                req.body.specialization,
                req.body.certifications,
                req.body.careerHighlights,
                req.body.careerStartDate,
                req.body.FkEmployeeId,
                req.body.isApprove,
                req.body.comment,
                req.body.reportingTo,
                req.body.Location
            );

            // need to delete the domanins and client here
            await DeleteTempEmployeeClientByEmployeeId(temp_data.recordset[0].Id);

            await DeleteTempEmployeeDomainByEmployeeId(temp_data.recordset[0].Id);
        }
    }

    Audit.InsertEmployeeAudit(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phoneNumber,
        req.body.countryCode,
        req.body.org,
        req.body.designationId,
        req.body.practiceAreaId,
        req.body.educationId,
        req.body.specialization,
        req.body.certifications,
        req.body.careerHighlights,
        req.body.careerStartDate,
        req.body.comment,
        req.body.FkEmployeeId,
        req.body.updatedStatus,
        req.body.Location
    );

    if (req.body.Role === "Admin") {
        Employee.GetEmployeeById(req.body.reportingTo)
            .then((res) => {
                //new additional code
                const managerName =
                    res.recordset[0].FirstName + " " + res.recordset[0].LastName;
                const name = req.body.firstName + " " + req.body.lastName;
                const comment = req.body.comment;
                sendNotification(
                    res.recordset[0].Email,
                    res.recordset[0].FirstName,
                    "Profile Updated",
                    GetUpdateMessage(managerName, name, comment)
                );
            });

        res.status(200).json({ Id: req.body.Id, isSuccess: true });
    }
    else {
        if (req.body.reportingTo !== null) {
            Employee.GetEmployeeById(req.body.reportingTo).then((res) => {
                //new additional code
                const managerName =
                    res.recordset[0].FirstName + " " + res.recordset[0].LastName;
                const name = req.body.firstName + " " + req.body.lastName;
                const comment = req.body.comment;
                sendNotification(
                    res.recordset[0].Email,
                    res.recordset[0].FirstName,
                    "Profile Updated",
                    GetUpdateMessage(managerName, name, comment)
                );
            });
        }
        res.status(200).json({
            Id:
                temp_data.recordset.length !== 0
                    ? temp_data.recordset[0].Id
                    : data.recordset[0][""],
            submitted: true,
            isSuccess: true,
        });
    }
}

const DeleteEmployee = async (req, res) => {
    await Employee.DeleteEmployeeById(req.body.Id)
    res.status(200).json({ isSuccess: true })
}

const GetReportingData = async (req, res) => {
    let data = await Employee.GetReportingdataId(req.body.FKEMPID)
    if (data.recordset.length === 0) {
        res.status(200).json({ isSuccess: false });
    } else {
        res.status(200).json({ isSuccess: true, ReportingData: data.recordset });
    }
}

const GetCurrentEmployeeById = async (req, res) => {

    const data = await Employee.GetEmployeeById(req.headers.id)

    const result = await getCurrentUser(data.recordset[0])

    res.status(200).json({ isSuccess: true, result: result })

}

const GetCurrentEmployeeByMail = async (req, res) => {

    let mail = req.headers.mail

    const data = await Employee.GetEmployeeByMailAddress(mail.toString().toLowerCase())

    if (data.recordset.length !== 0) {
        const result = await getCurrentUser(data.recordset[0])
        res.status(200).json({ isSuccess: true, result: result })
    }
    else {
        res.status(200).json({ isSuccess: false })
    }

}

const NewUserFromAzure = async (req, res) => {

    const { User_Data_Azure } = req.body;

    let mobileNumber =
        User_Data_Azure.mobilePhone === null
            ? 0
            : User_Data_Azure.mobilePhone.split(" ")[1];
    let countryCode =
        User_Data_Azure.mobilePhone === null
            ? 0
            : User_Data_Azure.mobilePhone.split(" ")[0].split("+")[1];

    let FK_DesignaitonId = null;

    let ReportingManager = null;

    let user_manager_id = await Employee.GetEmployeeByMailAddress(
        User_Data_Azure.Manager
    );

    let user_designation_id = await CheckDesignation(
        User_Data_Azure.jobTitle
    );

    if (user_designation_id.recordset.length === 0) {
        await InsertDesignations(User_Data_Azure.jobTitle);

        let designaiton_id = await GetTheLatestInsertedRecordId();

        FK_DesignaitonId = designaiton_id.recordset[0][""];
    } else {
        FK_DesignaitonId = user_designation_id.recordset[0].Id;
    }

    if (user_manager_id.recordset.length === 0) {
        ReportingManager = null;
    } else {
        ReportingManager = user_manager_id.recordset[0].Id;
    }

    await Employee.InsertEmployee(
        User_Data_Azure.displayName.split(" ")[0],
        User_Data_Azure.displayName.split(" ")[1],
        User_Data_Azure.mail,
        mobileNumber,
        countryCode,
        "genzeon",
        FK_DesignaitonId,
        User_Data_Azure.Education,
        User_Data_Azure.Specialization,
        "Not Updated",
        "Not Updated",
        User_Data_Azure.CareerStartDate,
        ReportingManager,
        User_Data_Azure.Location
    );

    let employee_build_profile = await Employee.GetEmployeeLatestId();

    Audit.InsertEmployeeAudit(
        User_Data_Azure.displayName.split(" ")[0],
        User_Data_Azure.displayName.split(" ")[1],
        User_Data_Azure.mail,
        mobileNumber,
        countryCode,
        "genzeon",
        FK_DesignaitonId,
        User_Data_Azure.Education,
        User_Data_Azure.Specialization,
        "Not Updated",
        "Not Updated",
        User_Data_Azure.CareerStartDate,
        "",
        employee_build_profile.recordset[0][""],
        "SSO - Logged In",
        User_Data_Azure.Location
    );

    await InsertEmployeeClients(
        employee_build_profile.recordset[0][""],
        User_Data_Azure.Client,
        User_Data_Azure.Billable
    );

    // const new_generated_password = GeneratePassword();

    // let password = await bcrypt.hash(new_generated_password, 5);

    // let new_username = User_Data_Azure.mail.toString().split("@")[0];

    // await InsertUserData(
    //     new_username,
    //     User_Data_Azure.mail,
    //     password,
    //     countryCode,
    //     mobileNumber,
    //     "genzeon",
    //     3,
    //     1,
    //     employee_build_profile.recordset[0][""]
    // );

    let data = await Employee.GetEmployeeByMailAddress(User_Data_Azure.mail);

    let response = await getCurrentUser(data.recordset[0]);

    res.status(200).json({ isSuccess: true, result: response });

}

const LoadAzureDataIntoIemployeeDB = async (req, res) => {

    let { data } = req.body;

    for (let i = 0; i < data.length; i++) {
        console.group('User', data[i].mail)
        console.log('')
        let result = await Employee.GetEmployeeByMailAddress(data[i].mail);
        if (result.recordset.length === 0) {
            let mobileNumber =
                data[i].mobilePhone === null
                    ? 0
                    : data[i].mobilePhone.split(" ").length === 1
                        ? data[i].mobilePhone
                        : data[i].mobilePhone.split(" ")[1];
            let countryCode =
                data[i].mobilePhone === null
                    ? 0
                    : data[i].mobilePhone.split(" ").length === 1
                        ? 0
                        : data[i].mobilePhone.split(" ")[0];

            let user_designation_id = await CheckDesignation(
                data[i].jobTitle
            );

            let FK_DesignaitonId = null;
            let ReportingManager = null;

            if (user_designation_id.recordset.length === 0) {
                await InsertDesignations(data[i].jobTitle);
                let designaiton_id = await GetTheLatestInsertedRecordId();
                FK_DesignaitonId = designaiton_id.recordset[0][""];
            } else {
                FK_DesignaitonId = user_designation_id.recordset[0].Id;
            }

            await Employee.InsertEmployee(
                data[i].givenName,
                data[i].surname,
                data[i].mail.toLowerCase(),
                mobileNumber,
                countryCode,
                "genzeon",
                FK_DesignaitonId,
                data[i].Education,
                data[i].Specialization,
                "Not Updated",
                "Not Updated",
                data[i].CareerStartDate,
                ReportingManager,
                data[i].Location
            );

            let employee_build_profile = await Employee.GetEmployeeLatestId();
            Audit.InsertEmployeeAudit(
                data[i].givenName,
                data[i].surname,
                data[i].mail.toLowerCase(),
                mobileNumber,
                countryCode,
                "genzeon",
                FK_DesignaitonId,
                data[i].Education,
                data[i].Specialization,
                "Not Updated",
                "Not Updated",
                data[i].CareerStartDate,
                "",
                employee_build_profile.recordset[0][""],
                "SSO - Logged In",
                data[i].Location
            );

            await InsertEmployeeClients(
                employee_build_profile.recordset[0][""],
                data[i].Client,
                data[i].Billable
            );

            // const new_generated_password = GeneratePassword();

            // let password = await bcrypt.hash(new_generated_password, 5);

            // let new_username = data[i].mail.toString().split("@")[0];

            // await InsertUserData(
            //     new_username,
            //     data[i].mail,
            //     password,
            //     countryCode,
            //     mobileNumber,
            //     "genzeon",
            //     3,
            //     1,
            //     employee_build_profile.recordset[0][""]
            // );
        } else {
            console.log(`USER EXIST in DB -- '${data[i].mail}'`);
        }
        console.log('')
        console.groupEnd('END')
    }

    for (let i = 0; i < data.length; i++) {
        let checkManager = await Employee.GetEmployeeByMailAddress(
            data[i].manager.toLowerCase()
        );
        if (checkManager.recordset.length !== 0) {
            await Employee.UpdateEmployeeManager(
                checkManager.recordset[0].Id,
                data[i].mail
            );
        } else {
            console.log(`manager does not exist for user--'${data[i].mail}'`);
        }
    }

    res.status(200).json({ isSuccess: true });

}

// new profile routes

const GetEmployeeSummaryDetailsById = async (req, res) => {

    if (req.headers.id !== null) {

        let employeeData = await Employee.GetEmployeeWithId(req.headers.id)

        employeeData = employeeData.recordset[0]

        let reportingToData = await Employee.GetEmployeeById(employeeData.REPORTINGTO)

        if (reportingToData.recordset.length !== 0) {
            employeeData = { ...employeeData, "REPORTINGTO": (reportingToData.recordset[0].FirstName + ' ' + reportingToData.recordset[0].LastName) }
        }
        else {
            employeeData = { ...employeeData, "REPORTINGTO": null }
        }

        res.status(200).json({ isSuccess: true, result: employeeData })
    }
    else {
        res.status(422).json({ isSuccess: false })
    }
}

const UpdateEmployeeSummary = async (req, res) => {

    let EmployeeId = 0

    let UpdatedStatus = ''

    let employeeDetails = req.body

    // get the designation id - check if it is exist or not if not insert and get the id back
    let FKDesignaitonId = await getDesignationId(employeeDetails.DESIGNATION)

    // get the education id - check if it is exist or not if not insert and get the id back
    let FKEducationId = await getEducationId(employeeDetails.EDUCATION)

    // get the client id...
    let FKClientId = await getClientId(employeeDetails.CLIENT)

    // get the reporting Manager Id back
    let reportingTo = await Employee.GetEmployeeById(employeeDetails.REPORTINGTO)

    employeeDetails = { ...employeeDetails, 'REPORTINGTO': reportingTo.recordset[0].Id }

    // check if the role is admin or not
    if (employeeDetails.ROLE === process.env.IEMPLOYEE_ADMIN || employeeDetails.ROLE === process.env.IEMPLOYEE_SU) {

        // update the employee clients table with fk_employeeid
        await UpdateEmployeeClientById(employeeDetails.ID, FKClientId, 0)

        // delete the employee domains with fk_employeeId
        await EmployeeDomains.DeleteEmployeeDomainByEmployeeId(employeeDetails.ID)

        // and insert the new domains with fk_employeeId
        await InsertDomain(employeeDetails.UPDATEDDOMAINS)

        // Update the record for employees table
        await Employee.UpdateEmployeeById(
            employeeDetails.ID,
            employeeDetails.FIRSTNAME,
            employeeDetails.LASTNAME,
            employeeDetails.EMAIL,
            employeeDetails.ORGANIZATION,
            employeeDetails.COUNTRYCODE,
            employeeDetails.PHONENUMBER,
            FKDesignaitonId,
            FKEducationId,
            employeeDetails.SPECIALIZATION,
            employeeDetails.CERTIFICATIONS,
            employeeDetails.CAREERHIGHLIGHTS,
            employeeDetails.CAREERSTARTDATE,
            employeeDetails.REPORTINGTO,
            employeeDetails.LOCATION
        )

        EmployeeId = employeeDetails.ID

        UpdatedStatus = 'Updated-Approved'

    }
    else {
        // If Not
        let check_TempData = await tempEmployee.GetTempEmployeeDataByEmployeeMail(employeeDetails.EMAIL)

        // check if the temp data with that email address is exist or not
        if (check_TempData.recordset.length !== 0) {

            // if yes

            // delete the employee client
            await DeleteTempEmployeeClientByEmployeeId(check_TempData.recordset[0].Id)

            // delete the employee domains
            await DeleteTempEmployeeDomainByEmployeeId(check_TempData.recordset[0].Id)
            // update the temp table with the details


            data = await tempEmployee.UpdateTempEmployeeData(
                check_TempData.recordset[0].Id,
                employeeDetails.FIRSTNAME,
                employeeDetails.LASTNAME,
                employeeDetails.EMAIL,
                employeeDetails.PHONENUMBER,
                employeeDetails.COUNTRYCODE,
                employeeDetails.ORGANIZATION,
                FKDesignaitonId,
                FKEducationId,
                employeeDetails.SPECIALIZATION,
                employeeDetails.CERTIFICATIONS,
                employeeDetails.CAREERHIGHLIGHTS,
                employeeDetails.CAREERSTARTDATE,
                employeeDetails.ID,
                employeeDetails.ISAPPROVED,
                employeeDetails.COMMENT,
                employeeDetails.REPORTINGTO,
                employeeDetails.LOCATION
            );
            EmployeeId = check_TempData.recordset[0].Id

        }
        else {
            //if not
            // insert the new temp table data
            tempEmployee.InsertTempEmployeeData(
                employeeDetails.FIRSTNAME,
                employeeDetails.LASTNAME,
                employeeDetails.EMAIL,
                employeeDetails.PHONENUMBER,
                employeeDetails.COUNTRYCODE,
                employeeDetails.ORGANIZATION,
                FKDesignaitonId,
                FKEducationId,
                employeeDetails.SPECIALIZATION,
                employeeDetails.CERTIFICATIONS,
                employeeDetails.CAREERHIGHLIGHTS,
                employeeDetails.CAREERSTARTDATE,
                employeeDetails.ID,
                employeeDetails.ISAPPROVED,
                employeeDetails.COMMENT,
                employeeDetails.REPORTINGTO,
                employeeDetails.LOCATION
            );
            let emp_latestId = data = await tempEmployee.GetLatestTempEmployeeId();
            EmployeeId = emp_latestId.recordset[0][""]
        }

        // inser the employee domain
        await InsertTempEmployeeDomain(employeeDetails.UPDATEDDOMAINS, EmployeeId)

        // insert the employee client
        await InsertTempEmployeeClient(EmployeeId, FKClientId, 0)


        UpdatedStatus = 'Updated'
    }

    // insert audit
    Audit.InsertEmployeeAudit(
        employeeDetails.FIRSTNAME,
        employeeDetails.LASTNAME,
        employeeDetails.EMAIL,
        employeeDetails.PHONENUMBER,
        employeeDetails.COUNTRYCODE,
        employeeDetails.ORGANIZATION,
        FKDesignaitonId,
        FKEducationId,
        employeeDetails.SPECIALIZATION,
        employeeDetails.CERTIFICATIONS,
        employeeDetails.CAREERHIGHLIGHTS,
        employeeDetails.CAREERSTARTDATE,
        employeeDetails.COMMENT,
        employeeDetails.ID,
        UpdatedStatus,
        employeeDetails.LOCATION
    )

    const message = `
   
Dear ${getCapitalized((reportingTo.recordset[0].FirstName + ' ' + reportingTo.recordset[0].LastName))}
 
Employee Name ${getCapitalized((employeeDetails.FIRSTNAME + ' ' + employeeDetails.LASTNAME))} is updated the Profile in iEmployee portal. Please review it carefully and take necessary action.
 
 
Thanks and Regards
    iEmployee
   
   
    `

    if (employeeDetails.ROLE !== process.env.IEMPLOYEE_ADMIN || employeeDetails.ROLE === process.env.IEMPLOYEE_SU) {
        // send the mail to manager... for approval...
        sendNotification(reportingTo.recordset[0].Email, (reportingTo.recordset[0].FirstName + ' ' + reportingTo.recordset[0].LastName), 'Employee Profile - Update Request', message)
    }

    // return the response as isSuccess and 200 key
    res.status(200).json({ isSuccess: true })
}

module.exports = {
    GetEmployees,
    GetbyIdEmployee,
    GetEmployeeDesignation,
    PostEmployee,
    UpdateEmployee,
    DeleteEmployee,
    GetReportingData,
    GetCurrentEmployeeById,
    NewUserFromAzure,
    LoadAzureDataIntoIemployeeDB,
    GetCurrentEmployeeByMail,
    GetEmployeeSummaryDetailsById,
    UpdateEmployeeSummary
}



function GetUpdateMessage(ManagerName, Name, Comment) {
    return `
  
      Dear ${getCapitalized(ManagerName)},
  
      ${getCapitalized(Name)} has updated their profile and provide a comment.
  
      The reason to update: ${Comment}
  
      Thank You
  
      `;
}

async function getCurrentUser(data) {
    let response = {};

    if (data.Id !== undefined || data.Id !== null) {
        let employeeResult = await Promise.all([
            Employee.GetReportingdataId(data.Id),
            GetProfileImageById(data.Id),
            GetEmployeeResumeById(data.Id),
            GetReportedBy(data.Id),
        ]);


        let reportees = [];

        if (employeeResult[0].recordset.length !== 0) {
            employeeResult[0].recordset.forEach((item) => reportees.push(item.ID));
        }

        let allocatedEmployees = [];
        if (employeeResult[3].recordset.length !== 0) {
            const dt = new Date();

            employeeResult[3].recordset.forEach((item) => {
                const JoiningDate = new Date(item.JoiningDate);
                const EndingDate = new Date(item.EndingDate);

                if (JoiningDate.getTime() <= dt.getTime()) {
                    if (EndingDate.getTime() >= dt.getTime()) {
                        allocatedEmployees.push(item.Id);
                    }
                }
            });
        }

        response = {
            Id: data.Id,
            employeeFirstName: data.FirstName,
            employeeLastName: data.LastName,
            email: data.Email,
            countryCode: data.CountryCode,
            phoneNumber: data.PhoneNumber,
            organization: data.Organization,
            reportingTo: data.ReportingTo,
            location: data.Location,
            profileImage:
                employeeResult[1].recordset.length !== 0
                    ? employeeResult[1].recordset[0].ProfileImage
                    : null,
            employeeResume:
                employeeResult[2].recordset.length !== 0
                    ? employeeResult[2].recordset[0].Resume
                    : null,
            reportees: reportees,
            allocatedEmployees: allocatedEmployees
        };
    } else {
        response = {
            employeeFirstName: null,
            employeeLastName: null,
            location: null,
            profileImage: null,
            employeeResume: null,
            reportees: [],
            allocatedEmployees: [],
            reportingTo: null,
        };
    }

    return response;
}

async function getDesignationId(designation) {

    const result = await CheckDesignation(designation)

    if (result.recordset.length === 0) {

        let data = await InsertDesignations(designation)

        if (data.rowsAffected.length !== 0) {

            let DesignationId = await GetTheLatestInsertedRecordId()

            return DesignationId.recordset[0][""]

        }

    }
    else {
        return result.recordset[0].Id
    }

}

async function getEducationId(education) {

    const result = await Educations.CheckEducation(education)

    if (result.recordset.length === 0) {

        let data = await Educations.InsertEducations(education)

        if (data.rowsAffected.length !== 0) {

            let EducatoinId = await Educations.GetTheLatestInsertedRecordId()

            return EducatoinId.recordset[0][""]

        }

    }
    else {
        return result.recordset[0].Id
    }

}

async function getClientId(clientname) {

    let clientData = await Clients.CheckClient(clientname)

    return clientData.recordset[0].Id

}

async function InsertDomain(list) {

    for (let i = 0; i < list.length; i++) {
        await EmployeeDomains.InsertEmployeeDomain(list[0].FK_EmployeeId, list[0].FK_DomainId, list[0].DomainExperience)
    }

}

async function InsertTempEmployeeDomain(list, employeeId) {

    for (let i = 0; i < list.length; i++) {
        await InsertEmpDomain(employeeId, list[0].FK_DomainId, list[0].DomainExperience)
    }

}