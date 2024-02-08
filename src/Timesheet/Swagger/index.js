/**
 * @swagger
 *
 *  tags:
 *      name: My Time
 *      description: My Time routes are used for My Time module in iEmployee
 *
 *
 *
 *
 */


// employee timehseet
/**
 * @swagger
 * components:
 *   schemas:
 *     WeeklyTimesheet:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         ProjectCode:
 *           type: string
 *         FKEmpId:
 *           type: integer
 *         WeekNumber:
 *           type: integer
 *         TotalHours:
 *           type: integer
 *         Status:
 *           type: string
 *         Comment:
 *           type: string
 *         OverTime:
 *           type: integer
 *         check:
 *           type: boolean
 *
 *     TimesheetStatus:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Status:
 *           type: string
 *
 *     TimesheetApproval:
 *       type: object
 *       properties:
 *         AllWeekIds:
 *           type: array
 *           items:
 *             type: integer
 *         FKEmpId:
 *           type: integer
 *         Comment:
 *           type: string
 *
 *     TimesheetResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         timesheet:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WeeklyTimesheet'
 *
 *     TimesheetReport:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         ProjectCode:
 *           type: string
 *         FKEmpId:
 *           type: integer
 *         WeekNumber:
 *           type: integer
 *         TotalHours:
 *           type: integer
 *         Status:
 *           type: string
 *         Comment:
 *           type: string
 *         OverTime:
 *           type: integer
 *         check:
 *           type: boolean
 *
 *     TimesheetTimelineResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         timeline:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetReport'
 *
 *     TimesheetReportsResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         timeline:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetReport'
 *
 *     TimesheetReportsAllResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         AllTimesheetReports:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetReport'
 *
 *     TimesheetReportsSendRequest:
 *       type: object
 *       properties:
 *         mailaddress:
 *           type: string
 *         Subject:
 *           type: string
 *         message:
 *           type: string
 *         ManagerName:
 *           type: string
 *
 *   responses:
 *     TimesheetTimelineResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         timeline:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetReport'
 *
 *
 *     TimesheetReportsAllResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         AllTimesheetReports:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetReport'
 *
 *     AllocatedProject:
 *       type: object
 *       properties:
 *         ID:
 *           type: integer
 *         ROLE:
 *           type: string
 *         BILLABLE:
 *           type: integer
 *         BILLINGRATE:
 *           type: integer
 *         LOCATION:
 *           type: integer
 *         JOINING_DT:
 *           type: string
 *           format: date-time
 *         ENDING_DT:
 *           type: string
 *           format: date-time
 *         PROJECTCODE:
 *           type: string
 *         FK_PROJECTCODEID:
 *           type: integer
 *         OT:
 *           type: boolean
 *         EMPLOYEENAME:
 *           type: string
 *         FK_EMPLOYEEID:
 *           type: integer
 *         APPROVER:
 *           type: string
 *         MANAGER_APPROVER:
 *           type: integer
 *     GetAllocatedProjectsResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         AllocatedProjects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AllocatedProject'
 * paths:
 *   /timesheet/get-weekly-timesheet-by-fk-id:
 *     post:
 *       summary: Get weekly timesheet by FKId
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKId:
 *                   type: integer
 *                 Year:
 *                   type: integer
 *                 NumberOfWeeks:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'

 *   /timesheet/get-weekly-timesheet-data:
 *     post:
 *       summary: Get weekly timesheet data
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Approver:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'

 *   /timesheet/checkstatus:
 *     post:
 *       summary: Check timesheet status
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 WeekId:
 *                   type: integer
 *                 FKEmpId:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetStatusResponse'

 *   /timesheet/approve-timesheet:
 *     post:
 *       summary: Approve timesheet
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimesheetApproval'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetStatusResponse'

 *   /timesheet/reject-timesheet:
 *     post:
 *       summary: Reject timesheet
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimesheetApproval'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetStatusResponse'
 *
 *   /timesheet/get-employee-timesheet-timeline:
 *     post:
 *       summary: Get employee timesheet timeline
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKIDs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       Min:
 *                         type: string
 *                       Max:
 *                         type: string
 *                       Approver:
 *                         type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetTimelineResponse'

 *   /timesheet/get-employee-timesheet-reports:
 *     post:
 *       summary: Get employee timesheet reports
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKIDs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       Approver:
 *                         type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetReportsResponse'

 *   /timesheet/get-all-employee-timesheet-reports:
 *     get:
 *       summary: Get all employee timesheet reports
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetReportsAllResponse'

 *   /timesheet/send-timesheet-reports:
 *     post:
 *       summary: Send timesheet reports
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimesheetReportsSendRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                     isSuccess:
 *                       type: boolean

 */


// projectallocation

/**
 * @swagger
 * paths:
 *   /timesheet/get-allocated-projects:
 *     get:
 *       summary: Get allocated projects
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllocatedProjectsResponse'
 *
 *   /timesheet/get-reported-employees:
 *     post:
 *       summary: Get reported employees
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKEmpId:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetReportedEmployeesResponse'
 *
 *   /timesheet/get-allocated-project-by-fkempid:
 *     post:
 *       summary: Get allocated project by FKEmpId
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKEmpId:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllocatedProjectByFKEmpIdResponse'
 *
 *   /timesheet/allocate-project:
 *     post:
 *       summary: Allocate project
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllocateProjectRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AllocateProjectResponse'
 *
 *   /timesheet/update-allocate-project:
 *     post:
 *       summary: Update allocated project
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateAllocateProjectRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UpdateAllocateProjectResponse'
 *
 * components:
 *   schemas:
 *     GetReportedEmployeesResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         ReportedBy:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               EmployeeName:
 *                 type: string
 *
 *     GetAllocatedProjectByFKEmpIdResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         AllocatedProject:
 *           type: array
 *           items:
 *             type: object
 *             properties:

 *               ProjectCode:
 *                 type: string
 *
 *     AllocateProjectRequest:
 *       type: object
 *       properties:
 *         SelectedProject:
 *           type: array
 *           items:
 *             type: string
 *         SelectedEmp:
 *           type: array
 *           items:
 *             type: string
 *         Role:
 *           type: string
 *         joiningDate:
 *           type: string
 *           format: date-time
 *         Billable:
 *           type: integer
 *         BillingRate:
 *           type: number
 *         Location:
 *           type: string
 *         Approver:
 *           type: string
 *         Creator:
 *           type: string
 *         endingDate:
 *           type: string
 *           format: date-time
 *         OverTime:
 *           type: boolean
 *
 *     AllocateProjectResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         Allocations:
 *           type: array
 *           items:
 *             type: object
 *             properties:

 *               EmployeeName:
 *                 type: string
 *
 *     UpdateAllocateProjectRequest:
 *       type: object
 *       properties:
 *         joiningDate:
 *           type: string
 *           format: date-time
 *         endingDate:
 *           type: string
 *           format: date-time
 *         Approver:
 *           type: string
 *         Id:
 *           type: string
 *         FKEmpId:
 *           type: string
 *         overTimeChecked:
 *           type: boolean
 *
 *     UpdateAllocateProjectResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         LatestAllocatedProjects:
 *           type: array
 *           items:
 *             type: object
 *             properties:

 *               ProjectCode:
 *                 type: string
 */

// project codes
/**
 * @swagger
 * paths:
 *   /timesheet/timesheet/get-project-codes:
 *     get:
 *       summary: Retrieve all project codes.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with project codes.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProjectCodesResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/get-project-code:
 *     get:
 *       summary: Retrieve a specific project code.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with the project code.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProjectCodesResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/insert-project-codes:
 *     post:
 *       summary: Insert project codes.
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProjectCodes:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                 FKEmpId:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Successful response after inserting project codes.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SuccessResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/get-project-codes-clients:
 *     get:
 *       summary: Retrieve unique clients from project codes.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with unique clients.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ClientsResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/get-allocated-project-codes:
 *     post:
 *       summary: Retrieve allocated project codes by approver.
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Approver:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response with allocated project codes.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProjectCodesResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     ProjectCodesResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         ProjectCodes:
 *           type: array
 *           items:
 *               type: object
 *               properties:
 *                 ProjectId:
 *                   type: integer
 *                 ProjectCode:
 *                   type: string
 *                 ProjectName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 IsActive:
 *                   type: boolean
 *
 *     ClientsResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Clients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Client'
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 *   responses:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 */
/**
 * @swagger
 * paths:
 *   /timesheet/get-markets:
 *     get:
 *       summary: Retrieve all markets.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with markets.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/MarketsResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/get-income-classes:
 *     get:
 *       summary: Retrieve all income classes.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with income classes.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/IncomeClassesResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/get-practices:
 *     get:
 *       summary: Retrieve all practices.
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response with practices.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/PracticesResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 *   /timesheet/generate-project-code:
 *     post:
 *       summary: Generate a new project code.
 *       tags: [My Time]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateProjectCodeRequest'
 *       responses:
 *         '200':
 *           description: Successful response with generated project code.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GenerateProjectCodeResponse'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 * components:
 *   schemas:
 *     MarketsResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Markets:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Market'
 *
 *     Market:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         Market:
 *           type: string
 *         Comment:
 *           type: string
 *         Created_dt:
 *           type: string
 *           format: date-time
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *         Created_by:
 *           type: integer
 *         Updated_by:
 *           type: integer
 *     IncomeClassesResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         InComeClasses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IncomeClass'
 *     IncomeClass:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         IncomeClass:
 *           type: string
 *         Comment:
 *           type: string
 *         Created_dt:
 *           type: string
 *           format: date-time
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *         Created_by:
 *           type: integer
 *         Updated_by:
 *           type: integer
 *
 *     PracticesResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Practices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Practice'
 *     Practice:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         PracticeaArea:
 *           type: string
 *         Comment:
 *           type: string
 *         Created_dt:
 *           type: string
 *           format: date-time
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *         Created_by:
 *           type: integer
 *         Updated_by:
 *           type: integer
 *     GenerateProjectCodeRequest:
 *       type: object
 *       properties:
 *         ClientName:
 *           type: string
 *         ClientCode:
 *           type: string
 *         ProjectName:
 *           type: string
 *         ProjectCode:
 *           type: string
 *         ExpiryDate:
 *           type: string
 *         FKEmpId:
 *           type: integer
 *
 *     GenerateProjectCodeResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         AllocatedProjectCodes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 *         Message:
 *           type: string
 *
 *
 *   responses:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TimesheetRecord:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         Work:
 *           type: string
 *         Type:
 *           type: string
 *         ProjectName:
 *           type: string
 *         WK_Day1:
 *           type: integer
 *         WK_Day2:
 *           type: integer
 *         WK_Day3:
 *           type: integer
 *         WK_Day4:
 *           type: integer
 *         WK_Day5:
 *           type: integer
 *         WK_Day6:
 *           type: integer
 *         WK_Day7:
 *           type: integer
 *         JoiningDate:
 *           type: string
 *         EndingDate:
 *           type: string
 *         ExpiryDate:
 *           type: string
 *         ROLE:
 *           type: string
 *
 *     ProjectTimesheet:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         ProjectCode:
 *           type: string
 *         FKEmpId:
 *           type: integer
 *         WeekNumber:
 *           type: integer
 *         TotalHours:
 *           type: integer
 *         Status:
 *           type: string
 *         Comment:
 *           type: string
 *         OverTime:
 *           type: integer
 *         check:
 *           type: boolean
 *
 *   responses:
 *     GetTimesheetRecordsOfEmployeeResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Timesheet:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetRecord'
 *         ROLE:
 *           type: string
 *
 *     GetProjectTimesheetResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         ProjectTimesheet:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProjectTimesheet'
 *
 * /timesheet/get-timesheet-records-of-employee:
 *   get:
 *     summary: Get timesheet records of an employee
 *     tags: [My Time]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTimesheetRecordsOfEmployeeResponse'
 *
 * /timesheet/get-project-timesheet:
 *   post:
 *     summary: Get project timesheet for an employee
 *     tags: [My Time]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: integer
 *               WeekId:
 *                 type: integer
 *             required:
 *               - FKEmpId
 *               - WeekId
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProjectTimesheetResponse'
 */


// Timesheet
/**
 * @swagger
 * components:
 *   schemas:
 *     TimesheetData:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         WK_Day1:
 *           type: integer
 *         WK_Day2:
 *           type: integer
 *         WK_Day3:
 *           type: integer
 *         WK_Day4:
 *           type: integer
 *         WK_Day5:
 *           type: integer
 *         WK_Day6:
 *           type: integer
 *         WK_Day7:
 *           type: integer
 *         WeekId:
 *           type: integer
 *         FKEmployeeId:
 *           type: integer

 *     InsertTimesheetRequest:
 *       type: object
 *       properties:
 *         WeekNumber:
 *           type: integer
 *         Month:
 *           type: integer
 *         Year:
 *           type: integer
 *         JobTitle:
 *           type: string
 *         Status:
 *           type: string
 *         TotalHours:
 *           type: integer
 *         FKEmployeeId:
 *           type: integer
 *         Comment:
 *           type: string
 *         WeekData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetData'
 *         Type:
 *           type: string

 *     UpdateTimesheetRequest:
 *       type: object
 *       properties:
 *         WeekId:
 *           type: integer
 *         Status:
 *           type: string
 *         TotalHours:
 *           type: integer
 *         FKEmployeeId:
 *           type: integer
 *         Comment:
 *           type: string
 *         WeekData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetData'
 *         Type:
 *           type: string

 *   responses:
 *     TimesheetResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         timesheetData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimesheetData'

 * paths:
 *   /timesheet/get-timesheet-with-week-id:
 *     post:
 *       summary: Get timesheet with week ID
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weekId:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'

 *   /timesheet/insert-timesheet:
 *     post:
 *       summary: Insert timesheet
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsertTimesheetRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'

 *   /timesheet/update-timesheet:
 *     post:
 *       summary: Update timesheet
 *       tags: [My Time]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTimesheetRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'
 */



// Holidays

/**
 * 
 * 
 * 
 * *   /timesheet/get-holidays/:year:
 *     Get:
 *       summary: Get Holidays
 *       tags: [My Time]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/responses/TimesheetResponse'
 * 
 * 
 * 
 */