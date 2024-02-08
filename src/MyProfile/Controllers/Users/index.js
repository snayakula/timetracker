const Users = require("../../Queries/Users/index");
const Employees = require("../../Queries/Employees");
const { GetProfileImageById } = require("../../Queries/EmployeeProfiles");
const { GetEmployeeResumeById } = require("../../Queries/EmployeeResume");
const {
    GetReportedBy,
} = require("../../../Timesheet/Queries/ProjectAllocation");
const bcrypt = require("bcrypt");

const GetUser = async (req, res) => {
    let data = await Users.GetUser()
    res.status(200).json({ isSuccess: true, UserData: data.recordset });
}

const GetUserRole = async (req, res) => {
    let data = await Users.GetUserAndRoles()
    res.send(data.recordset);
}

const CheckEmail = async (req, res) => {
    let result = await Users.CheckEmailAddress(req.body.MailAddress)
    if (result.recordset.length !== 0) {
        res.status(200).json({ isSuccess: true, Username: result.recordset[0].USERNAME });
    } else {
        res.status(200).json({ isSuccess: false, message: "Invalid Email Address" });
    }
}

const LoginController = async (req, res) => {
    const { Username, Password } = req.body;

    let userData = await Users.GetUserByUsername(Username);

    if (userData.recordset.length !== 0) {
        if (userData.recordset[0].IsApproved === 1) {
            let data = await bcrypt.compare(
                Password,
                userData.recordset[0].password
            );

            if (data) {
                let response = await getCurrentUser(userData);
                delete response.password;
                res.status(200).json({ isSuccess: true, User: response });
            } else {
                res.status(200).json({ isSuccess: false, error_type: "invalid" });
            }
        } else {
            res.status(200).json({ isSuccess: false, error_type: "notapproved" });
        }
    } else {
        res.status(200).json({ isSuccess: false, error_type: "invalid" });
    }

}

const InsertUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const countryCode = req.body.countryCode;
    const phoneNumber = req.body.phoneNumber;
    const org = req.body.org;
    const role = req.body.role;
    const IsApproved = req.body.IsApproved;

    let hashPassword = await bcrypt.hash(password, 5)
    await Users.InsertUserData(
        username,
        email,
        hashPassword,
        countryCode,
        phoneNumber,
        org,
        role,
        IsApproved,
        null
    )
    res.status(200).json({ isSuccess: true });
}

const UpdateUser = async (req, res) => {
    await Users.UpdateUserById(
        req.body.Id,
        req.body.userName,
        req.body.email,
        req.body.phoneNumber,
        req.body.countryCode,
        req.body.FKRoleId,
        req.body.FKEmployeeId
    )
    res.status(200).json({ isSuccess: true });
}

const UpdateIsApprove = async (req, res) => {
    await Users.UpdateIsApprove(req.body.Id, req.body.EmpId)
    res.status(200).json({ isSuccess: true });
}

const UpdatePassword = async (req, res) => {

    const { Username, Password } = req.body;

    let result = await bcrypt.hash(Password, 5)
    let user = await Users.GetUserByUsername(Username)
    if (user.recordset.length !== 0) {
        let response = await Users.UpdateUserPassword(Username, result)
        res.status(200).json({
            isSuccess: true,
            message: "Successfully Updated the Password",
        });
    } else {
        res.status(200).json({ isSuccess: false, message: "Invalid Credentails" });
    }

}

const AlterEMPId = async (req, res) => {

    await Users.AlterUser(req.body.Id, req.body.EmpId);
    res.json({ isSuccess: true })
}

const DeleteUser = async (req, res) => {
    await Users.DeleteUser(req.body.Id)
    res.status(200).json({ isSuccess: true })
}

module.exports = {
    GetUser,
    GetUserRole,
    CheckEmail,
    LoginController,
    InsertUser,
    UpdateUser,
    UpdateIsApprove,
    UpdatePassword,
    AlterEMPId,
    DeleteUser,
}


async function getCurrentUser(data) {
    let response = {};

    if (data.recordset[0].FKEmpId !== null) {
        let employeeResult = await Promise.all([
            Employees.GetEmployeeById(data.recordset[0].FKEmpId),
            Employees.GetReportingdataId(data.recordset[0].FKEmpId),
            GetProfileImageById(data.recordset[0].FKEmpId),
            GetEmployeeResumeById(data.recordset[0].FKEmpId),
            GetReportedBy(data.recordset[0].FKEmpId),
        ]);

        let reportees = [];

        if (employeeResult[1].recordset.length !== 0) {
            employeeResult[1].recordset.forEach((item) => reportees.push(item.ID));
        }

        let allocatedEmployees = [];
        if (employeeResult[4].recordset.length !== 0) {
            const dt = new Date();

            employeeResult[4].recordset.forEach((item) => {
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
            ...data.recordset[0],
            employeeFirstName: employeeResult[0].recordset[0].FirstName,
            employeeLastName: employeeResult[0].recordset[0].LastName,
            location: employeeResult[0].recordset[0].Location,
            profileImage:
                employeeResult[2].recordset.length !== 0
                    ? employeeResult[2].recordset[0].ProfileImage
                    : null,
            employeeResume:
                employeeResult[3].recordset.length !== 0
                    ? employeeResult[3].recordset[0].Resume
                    : null,
            reportees: reportees,
            allocatedEmployees: allocatedEmployees,
            reportingTo: employeeResult[0].recordset[0].ReportingTo,
        };
    } else {
        response = {
            ...data.recordset[0],
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
