const express = require("express");
const router = express.Router();
require('./Swagger/index')

const expressAsyncHandler = require("express-async-handler");
const { GetClients, InsertClients, GetByClient, RemoveClient, UpdateClient } = require("./Controllers/Clients");
const { InsertDesignation, AlterDesignation } = require("./Controllers/Designations");
const { DomainsController, AddDomain } = require("./Controllers/Domains");
const { InsertEducations, AlterEducations } = require("./Controllers/Educations");
const { GetEmployeeClient, GetEmployeeClientByEmployee, InsertEmployeeClient, UpdateEmployeeClient, DeleteEmployeeClient } = require('./Controllers/EmployeeClients');
const { EmployeeDomains, GetDomainsById, GetEmployeeDomainsById, PostDomains, UpdateDomains, DeleteDomain, DeleteDomainsWithEmployeeId } = require("./Controllers/EmployeeDomains");
const { GetProfileImages, GetProfilePictureById, UploadProfilePicture, UpdateProfilePicture, DeleteProfilePicture } = require("./Controllers/EmployeeProfiles");
const { uploadImage, uploadResume } = require("../../config/Uploads/Uploads");
const { UploadEmployeeEesume, GetEmployeeResumeById, DeleteEmployeeResume, UpdateEmployeeResume } = require("./Controllers/EmployeeResume");
const { GetEmployees, GetbyIdEmployee, GetEmployeeSummaryDetailsById, GetCurrentEmployeeById, GetCurrentEmployeeByMail, GetEmployeeDesignation, PostEmployee, UpdateEmployee, UpdateEmployeeSummary, DeleteEmployee, GetReportingData, NewUserFromAzure, LoadAzureDataIntoIemployeeDB } = require("./Controllers/Employees");
const { GetOrganization, InsertORG } = require("./Controllers/Organizations");
const { InsertPracticeArea, AlterPracticeArea } = require("./Controllers/PracticeAreas");
const { GetInitialDetailsController, DeleteEmployeeByIdController } = require("./Controllers/Procedures");
const { GetUserRoles } = require("./Controllers/Roles");
const { GetUser, GetUserRole, CheckEmail, LoginController, InsertUser, UpdateUser, UpdateIsApprove, UpdatePassword, AlterEMPId, DeleteUser } = require("./Controllers/Users");

// Clients

router.get("/get-clients", expressAsyncHandler(GetClients));

router.post("/insert-client", expressAsyncHandler(InsertClients));

router.post("/get-by-client", expressAsyncHandler(GetByClient));

router.post("/remove-client", expressAsyncHandler(RemoveClient));

router.post("/update-client", expressAsyncHandler(UpdateClient));


// Designations

router.post("/insert-designation", expressAsyncHandler(InsertDesignation));

router.post("/alter-designation", expressAsyncHandler(AlterDesignation));


// Domains

router.get("/domains", expressAsyncHandler(DomainsController));

router.post("/add-domain", expressAsyncHandler(AddDomain));



// Educations

router.post("/insert-educations", expressAsyncHandler(InsertEducations));

router.post("/alter-educations", expressAsyncHandler(AlterEducations));



// Employee Clients

router.get("/get-employee-client", expressAsyncHandler(GetEmployeeClient));

router.post("/get-employee-client-ByEmployee", expressAsyncHandler(GetEmployeeClientByEmployee));

router.post("/insert-employee-client", expressAsyncHandler(InsertEmployeeClient));

router.post("/update-employee-client", expressAsyncHandler(UpdateEmployeeClient));

router.post("/delete-employee-client", expressAsyncHandler(DeleteEmployeeClient));


// Employee Domains


router.get("/employeeDomains", expressAsyncHandler(EmployeeDomains));

router.post("/getdomainsbyid", expressAsyncHandler(GetDomainsById));

router.post("/get-employee-domains-by-id", expressAsyncHandler(GetEmployeeDomainsById));

router.post("/postdomains", expressAsyncHandler(PostDomains));

router.post("/updatedomains", expressAsyncHandler(UpdateDomains));

router.post("/deletedomain", expressAsyncHandler(DeleteDomain));

router.post("/delete-domains-with-employee-id", expressAsyncHandler(DeleteDomainsWithEmployeeId));



// Employee Profile

router.get("/getprofileimages", expressAsyncHandler(GetProfileImages));

router.post("/get-profile-picture-by-id", expressAsyncHandler(GetProfilePictureById));

router.post("/upload-profile-picture", uploadImage, expressAsyncHandler(UploadProfilePicture));

router.post("/update-profile-picture", uploadImage, expressAsyncHandler(UpdateProfilePicture));

router.post("/delete-profile-picture", expressAsyncHandler(DeleteProfilePicture));


// Employee Resume

router.post("/upload-employee-resume", uploadResume, expressAsyncHandler(UploadEmployeeEesume));

router.post("/update-employee-resume", uploadResume, expressAsyncHandler(UpdateEmployeeResume));

router.post("/get-employee-resume-by-id", expressAsyncHandler(GetEmployeeResumeById));

router.post("/delete-employee-resume", expressAsyncHandler(DeleteEmployeeResume));


// Employees



router.get("/getemployees", expressAsyncHandler(GetEmployees));

router.post("/getbyidemployee", expressAsyncHandler(GetbyIdEmployee));

router.get('/get-employee-summary-details', expressAsyncHandler(GetEmployeeSummaryDetailsById))

router.get('/get-current-employee-by-id', expressAsyncHandler(GetCurrentEmployeeById))

router.get('/get-current-employee-by-mail', expressAsyncHandler(GetCurrentEmployeeByMail))

router.post("/get-employee-designation", expressAsyncHandler(GetEmployeeDesignation));

router.post("/postemployee", expressAsyncHandler(PostEmployee));

router.post("/updateemployee", expressAsyncHandler(UpdateEmployee));

router.post('/update-employee-summary', expressAsyncHandler(UpdateEmployeeSummary))

router.post("/deleteemployee", expressAsyncHandler(DeleteEmployee));

router.post("/get-reporting-data", expressAsyncHandler(GetReportingData));

router.post("/new-user-from-azure", expressAsyncHandler(NewUserFromAzure));

router.post("/load-azure-data-into-iemployee-db", expressAsyncHandler(LoadAzureDataIntoIemployeeDB));



// Organizations

router.get("/getorganization", expressAsyncHandler(GetOrganization));

router.post("/insertorg", expressAsyncHandler(InsertORG));



// Practice Areas


router.post("/insert-practiceArea", expressAsyncHandler(InsertPracticeArea));

router.post("/alter-practiceArea", expressAsyncHandler(AlterPracticeArea));



// Procedures

router.post("/get-initial-details", expressAsyncHandler(GetInitialDetailsController));

router.post("/delete-employee-by-id", expressAsyncHandler(DeleteEmployeeByIdController));



// Roles

router.get("/get-user-roles", expressAsyncHandler(GetUserRoles));


// Users


router.get("/getuser", expressAsyncHandler(GetUser));

router.get("/getuserrole", expressAsyncHandler(GetUserRole));

router.post("/check-email", expressAsyncHandler(CheckEmail));

router.post("/login", expressAsyncHandler(LoginController));

router.post("/insertuser", expressAsyncHandler(InsertUser));

router.post("/updateUser", expressAsyncHandler(UpdateUser));

router.post("/update-is-approve", expressAsyncHandler(UpdateIsApprove));

router.post("/update-password", expressAsyncHandler(UpdatePassword));

router.post("/alterempid", expressAsyncHandler(AlterEMPId));

router.post("/deleteuser", expressAsyncHandler(DeleteUser));



module.exports = router