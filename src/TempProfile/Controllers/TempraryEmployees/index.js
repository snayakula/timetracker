const Employees = require("../../Queries/TempraryEmployees");
const Audit = require("../../../MyProfile/Queries/EmployeeAudit");

const emp = require("../../../MyProfile/Queries/Employees");

const {
  InsertEmployee,
  GetEmployeeById,
  UpdateEmployeeById,
} = require("../../../MyProfile/Queries/Employees");
const {
  GetTempEmployeeDomainsByEmployeeId,
  DeleteTempEmployeeDomainByEmployeeId,
} = require("../../Queries/TempraryEmployeeDomains");
const {
  GetTempEmployeeClientByFKId,
  DeleteTempEmployeeClientByEmployeeId,
} = require("../../Queries/TempraryEmployeeClients");
const {
  InsertEmployeeDomain,
  DeleteEmployeeDomainByEmployeeId,
} = require("../../../MyProfile/Queries/EmployeeDomains");
const {
  InsertEmployeeClients,
  DeleteEmployeeClientByFKId,
} = require("../../../MyProfile/Queries/EmployeeClients");
const {
  GetUserByEmail,
  AlterUser,
} = require("../../../MyProfile/Queries/Users");
const { sendNotification } = require("../../../../config/Mails/MailSender");



const GetTempEmployees = async (req, res) => {
  let data = await Employees.GetTempEmployeeData();
  res.json({ isSuccess: true, empData: data.recordset });
}

const GetTempEmployeeById = async (req, res) => {
  let result = await Employees.GetTempEmployeeDataById(req.body.Id)
  res.json({ isSuccess: true, TempEmployee: result.recordset });
}

const InsertTempEmployee = async (req, res) => {
  await Employees.InsertTempEmployeeData(
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
    req.body.Fk_EmployeeId,
    req.body.isApprove,
    req.body.Comment
  );

  let ng_id = await TempEmp.GetTheLatestInsertedRecordId();

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
    req.body.Fk_EmployeeId,
    req.body.UpdatedStatus
  );

  res.json({ Id: ng_id.recordset[0][""], submitted: true });
}

const DeleteTempEmployee = async (req, res) => {
  await DeleteTempEmployeeClientByEmployeeId(req.body.Id);
  await DeleteTempEmployeeDomainByEmployeeId(req.body.Id);

  let result = await Employees.DeleteTempEmployeeById(req.body.Id);
  if (result.rowsAffected.length !== 0) {
    res.status(200).json({ isSuccess: true });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const ApproveEmployee = async (req, res) => {
  let temp_employee = await Employees.GetTempEmployeeDataById(req.body.Id);
  if (temp_employee.recordset.length === 0) {
    res.status(200).json({ isSuccess: false });
  }

  // delete emp_domain of original employee
  if (req.body.FKEmpId !== null) {
    await DeleteEmployeeDomainByEmployeeId(req.body.FKEmpId);

    // delete employee_client of original employee
    await DeleteEmployeeClientByFKId(req.body.FKEmpId);
  }

  let employee_result = { recordset: [] };

  if (req.body.FKEmpId !== null) {
    employee_result = await GetEmployeeById(req.body.FKEmpId);
  }

  let lt_EmpId = [];

  if (employee_result.recordset.length !== 0) {
    await UpdateEmployeeById(
      req.body.FKEmpId,
      temp_employee.recordset[0].FirstName,
      temp_employee.recordset[0].LastName,
      temp_employee.recordset[0].Email,
      temp_employee.recordset[0].Organization,
      temp_employee.recordset[0].CountryCode,
      temp_employee.recordset[0].PhoneNumber,
      temp_employee.recordset[0].FK_DesignationId,
      temp_employee.recordset[0].FK_EducationId,
      temp_employee.recordset[0].Specialization,
      temp_employee.recordset[0].Certifications,
      temp_employee.recordset[0].CareerHighlights,
      convert(temp_employee.recordset[0].CareerStartDate),
      temp_employee.recordset[0].ReportingTo,
      temp_employee.recordset[0].Location
    );
  }
  else {
    await InsertEmployee(
      temp_employee.recordset[0].FirstName,
      temp_employee.recordset[0].LastName,
      temp_employee.recordset[0].Email,
      temp_employee.recordset[0].PhoneNumber,
      temp_employee.recordset[0].CountryCode,
      temp_employee.recordset[0].Organization,
      temp_employee.recordset[0].FK_DesignationId,
      temp_employee.recordset[0].FK_EducationId,
      temp_employee.recordset[0].Specialization,
      temp_employee.recordset[0].Certifications,
      temp_employee.recordset[0].CareerHighlights,
      convert(temp_employee.recordset[0].CareerStartDate),
      temp_employee.recordset[0].ReportingTo,
      temp_employee.recordset[0].Location
    );

    lt_EmpId = await emp.GetEmployeeLatestId();
    let user = await GetUserByEmail(req.body.Email);

    await AlterUser(user.recordset[0].Id, lt_EmpId.recordset[0][""]);
  }

  await Audit.InsertEmployeeAudit(
    temp_employee.recordset[0].FirstName,
    temp_employee.recordset[0].LastName,
    temp_employee.recordset[0].Email,
    temp_employee.recordset[0].PhoneNumber,
    temp_employee.recordset[0].CountryCode,
    temp_employee.recordset[0].Organization,
    temp_employee.recordset[0].FK_DesignationId,
    temp_employee.recordset[0].FK_EducationId,
    temp_employee.recordset[0].Specialization,
    temp_employee.recordset[0].Certifications,
    temp_employee.recordset[0].CareerHighlights,
    convert(temp_employee.recordset[0].CareerStartDate),
    req.body.Comment,
    req.body.FKEmpId === null ? lt_EmpId.recordset[0][""] : req.body.FKEmpId,
    req.body.UpdatedStatus,
    temp_employee.recordset[0].Location
  );

  // get the domains based on temp_id
  let domains = await GetTempEmployeeDomainsByEmployeeId(req.body.Id);

  domains.recordset.forEach((domain, index) => {
    // fill the domains with the new Employee id as FkEmpId
    InsertEmployeeDomain(
      req.body.FKEmpId === null
        ? lt_EmpId.recordset[0][""]
        : req.body.FKEmpId,
      domains.recordset[index].FK_DomainId,
      domains.recordset[index].DomainExperience
    );
  });

  // get client based on temp_Id
  let client = await GetTempEmployeeClientByFKId(req.body.Id);
  // fill the client with the new Employee id as FkEmpId
  await InsertEmployeeClients(
    req.body.FKEmpId === null ? lt_EmpId.recordset[0][""] : req.body.FKEmpId,
    client.recordset[0].FK_ClientId,
    client.recordset[0].Billable
  );

  // delete domains
  await DeleteTempEmployeeDomainByEmployeeId(req.body.Id);

  // delete clients
  await DeleteTempEmployeeClientByEmployeeId(req.body.Id);

  // delete the temp_employee based on the temp_id
  await Employees.DeleteTempEmployeeById(req.body.Id);

  emp.GetEmployeeById(temp_employee.recordset[0].ReportingTo).then((res) => {
    //new additional code
    const managerName =
      res.recordset[0].FirstName + " " + res.recordset[0].LastName;
    const name =
      temp_employee.recordset[0].FirstName +
      " " +
      temp_employee.recordset[0].LastName;
    sendNotification(
      temp_employee.recordset[0].Email,
      temp_employee.recordset[0].FirstName,
      "Profile Approved",
      GetApprovedMessage(name, managerName)
    );
  });

  res.status(200).json({
    Id:
      req.body.FKEmpId === null
        ? lt_EmpId.recordset[0][""]
        : req.body.FKEmpId,
    submitted: true,
    isSuccess: true,
  });
}

const RejectEmployee = async (req, res) => {
  let temp_employee = await Employees.GetTempEmployeeDataById(req.body.Id);
  if (temp_employee.recordset.length === 0) {
    //   if (temp_employee.recordset === undefined) {
    res.status(200).json({ isSuccess: false });
  }

  // Alter the isApprove in temp_employee.recordset
  await Employees.UpdateIsApproveTempEmployee(req.body.Id, 1);

  await Audit.InsertEmployeeAudit(
    temp_employee.recordset[0].FirstName,
    temp_employee.recordset[0].LastName,
    temp_employee.recordset[0].Email,
    temp_employee.recordset[0].PhoneNumber,
    temp_employee.recordset[0].CountryCode,
    temp_employee.recordset[0].Organization,
    temp_employee.recordset[0].FK_DesignationId,
    temp_employee.recordset[0].FK_PracticeAreaId,
    temp_employee.recordset[0].FK_EducationId,
    temp_employee.recordset[0].Specialization,
    temp_employee.recordset[0].Certifications,
    temp_employee.recordset[0].CareerHighlights,
    convert(temp_employee.recordset[0].CareerStartDate),
    req.body.comment,
    temp_employee.recordset[0].Fk_EmployeeId,
    req.body.updatedStatus,
    temp_employee.recordset[0].Location
  );

  emp.GetEmployeeById(temp_employee.recordset[0].ReportingTo).then((res) => {
    const managerName =
      res.recordset[0].FirstName + " " + res.recordset[0].LastName;
    const name =
      temp_employee.recordset[0].FirstName +
      " " +
      temp_employee.recordset[0].LastName;
    const comment = req.body.comment;
    sendNotification(
      temp_employee.recordset[0].Email,
      temp_employee.recordset[0].FirstName,
      "Profile Updated",
      GetRejectedMessage(managerName, name, comment)
    );
  });

  res.status(200).json({ isSuccess: true });
}




module.exports = {
  GetTempEmployees,
  GetTempEmployeeById,
  InsertTempEmployee,
  DeleteTempEmployee,
  ApproveEmployee,
  RejectEmployee
}




function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function GetApprovedMessage(Name, ManagerName) {
  return `
    Dear ${Name},

    We are pleased to inform you that your profile has been approved by ${ManagerName}.

    Thank you
    `;
}

function GetRejectedMessage(ManagerName, Name, Comment) {
  return `
    Dear ${Name},

    We regret to inform you that your profile has been rejected by ${ManagerName}.

    Reason for rejection: ${Comment}

    Thank you
    `;
}
