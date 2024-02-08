const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { GetWeeklyTimesheetByFKId, GetWeeklyTimesheetData, CheckStatus, ApproveTimesheet, RejectTimesheet, GetEmployeeTimesheetTimeline, GetEmployeeTimesheetReports, GetAllEmployeeTimesheetEeports, SendTimesheetReports, GetMonthlySummary } = require("./Controllers/EmployeeTimeSheet");
const { GetAllocatedProjects, GetReportedEmployees, GetAllocatedProjectByFKEmpId, AllocateProject, UpdateAllocateProject } = require("./Controllers/ProjectAllocation");
const { GetProjectCodes, GetProjectCode, GetTimesheetRecordsOfEmployee, GetProjectCodesClients, InsertProjectCodes, GetProjectTimesheet, GetAllocatedProjectCodes, GetMarkets, GetIncomeClasses, GetPractices, GenerateProjectCode } = require("./Controllers/ProjectCodes");
const { GetTimesheetWithWeekId, InsertTimesheet, UpdateTimesheet, GetTimesheetDetailsSpecialCondition } = require("./Controllers/TimeSheet");
const { GetHolidays, InsertHolidays } = require("./Controllers/Holidays");

const router = express.Router();



// Employee Timesheet



router.post("/get-weekly-timesheet-by-fk-id", expressAsyncHandler(GetWeeklyTimesheetByFKId));

router.post("/get-weekly-timesheet-data", expressAsyncHandler(GetWeeklyTimesheetData));

router.post("/checkstatus", expressAsyncHandler(CheckStatus));

router.post("/approve-timesheet", expressAsyncHandler(ApproveTimesheet));

router.post("/reject-timesheet", expressAsyncHandler(RejectTimesheet));

router.post("/get-employee-timesheet-timeline", expressAsyncHandler(GetEmployeeTimesheetTimeline));

router.post("/get-employee-timesheet-reports", expressAsyncHandler(GetEmployeeTimesheetReports));

router.get("/get-all-employee-timesheet-reports", expressAsyncHandler(GetAllEmployeeTimesheetEeports));

router.post("/send-timesheet-reports", expressAsyncHandler(SendTimesheetReports));

router.post("/get-monthly-summary", expressAsyncHandler(GetMonthlySummary));


// Project Allocations

router.get("/get-allocated-projects", expressAsyncHandler(GetAllocatedProjects));

router.post("/get-reported-employees", expressAsyncHandler(GetReportedEmployees));

router.post("/get-allocated-project-by-fkempid", expressAsyncHandler(GetAllocatedProjectByFKEmpId));

router.post("/allocate-project", expressAsyncHandler(AllocateProject));

router.post("/update-allocate-project", expressAsyncHandler(UpdateAllocateProject));




// Project Codes



router.get("/get-project-codes", expressAsyncHandler(GetProjectCodes));

router.get("/get-project-code", expressAsyncHandler(GetProjectCode));

router.get("/get-timesheet-records-of-employee", expressAsyncHandler(GetTimesheetRecordsOfEmployee));

router.get("/get-project-codes-clients", expressAsyncHandler(GetProjectCodesClients));

router.post("/insert-project-codes", expressAsyncHandler(InsertProjectCodes));

router.post("/get-project-timesheet", expressAsyncHandler(GetProjectTimesheet));

router.post("/get-allocated-project-codes", expressAsyncHandler(GetAllocatedProjectCodes));

router.get("/get-markets", expressAsyncHandler(GetMarkets));

router.get("/get-income-classes", expressAsyncHandler(GetIncomeClasses));

router.get("/get-practices", expressAsyncHandler(GetPractices));

router.post("/generate-project-code", expressAsyncHandler(GenerateProjectCode));




// Timesheet


router.post("/get-timesheet-with-week-id", expressAsyncHandler(GetTimesheetWithWeekId));

router.post("/insert-timesheet", expressAsyncHandler(InsertTimesheet));

router.post("/update-timesheet", expressAsyncHandler(UpdateTimesheet));

router.post("/get-timesheet-details-for-special-condition", expressAsyncHandler(GetTimesheetDetailsSpecialCondition));



// Holidays


router.get('/get-holidays/:year', expressAsyncHandler(GetHolidays))

router.post('/insert-holidays', expressAsyncHandler(InsertHolidays))





module.exports = router;