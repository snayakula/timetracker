/**
 * @swagger
 *
 *  tags:
 *      name: My Profile
 *      description: My profile routes are used for My Profile module in iEmployee
 *
 *
 *
 *
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the client
 *         ClientName:
 *           type: string
 *           description: The name of the client
 *         TypeOfContract:
 *           type: string
 *           description: The type of contract with the client
 *         GenzeonPOC:
 *           type: string
 *           description: Genzeon Point of Contact
 *         ClientPOC:
 *           type: string
 *           description: Client Point of Contact
 *         ProjectManager:
 *           type: string
 *           description: Project Manager associated with the client
 *         FKEmployeeId:
 *           type: string
 *           description: Foreign key referencing an employee ID
 *         Created_by:
 *           type: null
 *           description: The entity that created the client (null if not specified)
 *         Created_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was created
 *         Updated_by:
 *           type: null
 *           description: The entity that last updated the client (null if not updated)
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was last updated
 *
 *     Insert-Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the client
 *         ClientName:
 *           type: string
 *           description: The name of the client
 *         TypeOfContract:
 *           type: string
 *           description: The type of contract with the client
 *         GenzeonPOC:
 *           type: string
 *           description: Genzeon Point of Contact
 *         ClientPOC:
 *           type: string
 *           description: Client Point of Contact
 *         ProjectManager:
 *           type: string
 *           description: Project Manager associated with the client
 *         FKEmployeeId:
 *           type: string
 *           description: Foreign key referencing an employee ID
 *
 *     Domain:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the domain
 *         domain:
 *           type: string
 *           description: The name of the domain
 *         comment:
 *           type: string
 *           description: Additional comments or description for the domain
 *         FKId:
 *           type: string
 *           description: Foreign key referencing another entity (replace with actual description)
 *         Created_by:
 *           type: null
 *           description: The entity that created the domain (null if not specified)
 *         Created_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the domain was created
 *
 *     EmployeeClient:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *           description: The unique identifier for the employee
 *         FKClientId:
 *           type: string
 *           description: The unique identifier for the client
 *         Billable:
 *           type: boolean
 *           description: Indicates if the employee is billable for the client
 *         Created_by:
 *           type: null
 *           description: The entity that created the client (null if not specified)
 *         Created_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was created
 *         Updated_by:
 *           type: null
 *           description: The entity that last updated the client (null if not updated)
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was last updated
 *
 *     Insert-EmployeeClient:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *           description: The unique identifier for the employee
 *         FKClientId:
 *           type: string
 *           description: The unique identifier for the client
 *         Billable:
 *           type: boolean
 *           description: Indicates if the employee is billable for the client
 *
 *     EmployeeDomain:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *           description: The unique identifier for the employee
 *         FKDomainId:
 *           type: string
 *           description: The unique identifier for the domain
 *         domainExp:
 *           type: string
 *           description: Domain expertise or any additional information related to the employee's domain
 *         # Include any additional properties specific to your application
  *         Created_by:
 *           type: null
 *           description: The entity that created the client (null if not specified)
 *         Created_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was created
 *         Updated_by:
 *           type: null
 *           description: The entity that last updated the client (null if not updated)
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the client was last updated
 *     Insert-EmployeeDomain:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *           description: The unique identifier for the employee
 *         FKDomainId:
 *           type: string
 *           description: The unique identifier for the domain
 *         domainExp:
 *           type: string
 *           description: Domain expertise or any additional information related to the employee's domain
 *         # Include any additional properties specific to your application
 *     ProfileImage:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfileImageDetails'
 *         profileimage:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - isSuccess
 *
 *     ProfileImageDetails:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *         filename:
 *           type: string
 *         # Include any additional properties specific to your application
 *
 *     EmployeeResume:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         EmpResume:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EmployeeResumeDetails'
 *         message:
 *           type: string
 *       required:
 *         - isSuccess
 *     EmployeeResumeDetails:
 *       type: object
 *       properties:
 *         FKEmpId:
 *           type: string
 *         filename:
 *           type: string
 *         # Include any additional properties specific to your application
 *
 *     EmployeeDetails:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         employeeFirstName:
 *           type: string
 *         employeeLastName:
 *           type: string
 *         email:
 *           type: string
 *         countryCode:
 *           type: integer
 *         phoneNumber:
 *           type: string
 *         organization:
 *           type: string
 *         reportingTo:
 *           type: integer
 *         location:
 *           type: integer
 *         profileImage:
 *           type: null  # Adjust the type based on the actual data type
 *         employeeResume:
 *           type: null  # Adjust the type based on the actual data type
 *         reportees:
 *           type: array
 *           items:
 *             type: integer
 *         allocatedEmployees:
 *           type: array
 *           items:
 *             type: integer
 *
 *     PostEmployeeRequest:
 *       type: object
 *       properties:
 *         FirstName:
 *           type: string
 *         LastName:
 *           type: string
 *         Email:
 *           type: string
 *         PhoneNumber:
 *           type: string
 *         CountryCode:
 *           type: integer
 *         Organization:
 *           type: string
 *         FK_DesignationId:
 *           type: integer
 *         FK_PracticeAreaId:
 *           type: integer
 *         FK_EducationId:
 *           type: integer
 *         Specialization:
 *           type: string
 *         Certifications:
 *           type: string
 *         CareerHighlights:
 *           type: string
 *         CareerStartDate:
 *           type: string
 *         FK_EmployeeId:
 *           type: integer
 *         isApprove:
 *           type: boolean
 *         Comment:
 *           type: string
 *         ReportingTo:
 *           type: integer
 *         Location:
 *           type: integer
 *
 *     PostEmployeeResponse:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         submitted:
 *           type: boolean
 *
 *     UpdateEmployeeRequest:
 *       type: object
 *       properties:
 *         Role:
 *           type: string
 *         Id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         org:
 *           type: string
 *         countryCode:
 *           type: integer
 *         phoneNumber:
 *           type: string
 *         designationId:
 *           type: integer
 *         practiceAreaId:
 *           type: integer
 *         educationId:
 *           type: integer
 *         specialization:
 *           type: string
 *         certifications:
 *           type: string
 *         careerHighlights:
 *           type: string
 *         careerStartDate:
 *           type: string
 *         reportingTo:
 *           type: integer
 *         Location:
 *           type: integer
 *         FkEmployeeId:
 *           type: integer
 *         isApprove:
 *           type: boolean
 *         comment:
 *           type: string
 *         updatedStatus:
 *           type: string
 *
 *     UpdateEmployeeResponse:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         isSuccess:
 *           type: boolean
 *
 *     GetReportingDataResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         ReportingData:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               // Properties of ReportingData

 *     OrganizationResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Organization:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrganizationDetails'
 *       required:
 *         - isSuccess
 *
 *     OrganizationDetails:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         Organization:
 *           type: string
 *         Created_by:
 *           type: string
 *           nullable: true
 *         Created_dt:
 *           type: string
 *           format: date-time
 *         Updated_by:
 *           type: string
 *           nullable: true
 *         Updated_dt:
 *           type: string
 *           format: date-time
 *
 *     Insert-OrganizationDetails:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         Organization:
 *           type: string

 *     PracticeAreaAlterResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         Id:
 *           type: integer
 *       required:
 *         - isSuccess
 *         - Id
 *
 *     PracticeAreaInsertResponse:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         isSuccess:
 *           type: boolean
 *       required:
 *         - Id
 *         - isSuccess
 *
 *     TimesheetEntry:
 *       type: object
 *       properties:
 *         WeekId:
 *           type: integer
 *         WeekNumber:
 *           type: integer
 *         Month:
 *           type: string
 *         Status:
 *           type: string
 *         Total:
 *           type: number
 *         SubmittedDate:
 *           type: string
 *         Approver:
 *           type: string
 *         UpdatedBy:
 *           type: string
 *       required:
 *         - WeekId
 *         - WeekNumber
 *         - Month
 *         - Status
 *         - Total
 *         - SubmittedDate
 *         - Approver
 *         - UpdatedBy
 *
 *     InitialDetailsResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         InitialDetails:
 *           type: object
 *           properties:
 *             Designations:
 *               type: array
 *               items:
 *                 type: object
 *             PracticeAreas:
 *               type: array
 *               items:
 *                 type: object
 *             Educations:
 *               type: array
 *               items:
 *                 type: object
 *             Domains:
 *               type: array
 *               items:
 *                 type: object
 *             Employees:
 *               type: array
 *               items:
 *                 type: object
 *             EmployeeApprovals:
 *               type: array
 *               items:
 *                 type: object
 *             Users:
 *               type: array
 *               items:
 *                 type: object
 *             Roles:
 *               type: array
 *               items:
 *                 type: object
 *             Clients:
 *               type: array
 *               items:
 *                 type: object
 *             EmployeeAudit:
 *               type: array
 *               items:
 *                 type: object
 *             WeeklyTimesheet:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimesheetEntry'
 *             TimesheetReportees:
 *               type: array
 *               items:
 *                 type: object
 *             TimesheetReports:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimesheetEntry'
 *             TimesheetApprovals:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimesheetEntry'
 *             AllocatedProjects:
 *               type: array
 *               items:
 *                 type: object
 *             ProjectCodes:
 *               type: array
 *               items:
 *                 type: object
 *       required:
 *         - isSuccess
 *         - InitialDetails
 *
 *     UserRoles:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         UserRoles:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ID:
 *                 type: integer
 *               USERNAME:
 *                 type: string
 *               EMAIL:
 *                 type: string
 *               PASSWORD:
 *                 type: string
 *               COUNTRYCODE:
 *                 type: integer
 *               PHONENUMBER:
 *                 type: string
 *               ORGANIZATION:
 *                 type: string
 *               ROLE:
 *                 type: string
 *               FK_ROLEID:
 *                 type: integer
 *               ISAPPROVED:
 *                 type: integer
 *               FK_EMPLOYEEID:
 *                 type: integer
 *
 *     User:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         Username:
 *           type: string
 *         Email:
 *           type: string
 *         Password:
 *           type: string
 *         CountryCode:
 *           type: integer
 *         PhoneNumber:
 *           type: string
 *         Organization:
 *           type: string
 *         FK_RoleId:
 *           type: integer
 *         FK_EmployeeId:
 *           type: integer
 *         IsApproved:
 *           type: integer
 *         Created_by:
 *           type: integer
 *         Created_dt:
 *           type: string
 *           format: date-time
 *         Updated_by:
 *           type: integer
 *         Updated_dt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /iemployee/get-clients:
 *   get:
 *     summary: Get all clients
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Clients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *       400:
 *         description: No clients found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/get-by-client:
 *   post:
 *     summary: Get client by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Client ID to retrieve
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved client by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 ClientData:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: No client found with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/insert-client:
 *   post:
 *     summary: Insert a new client
 *     tags: [My Profile]
 *     requestBody:
 *       description: Client details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert-Client'
 *     responses:
 *       200:
 *         description: Client inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Failed to insert client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/update-client:
 *   post:
 *     summary: Update client by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Client details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Failed to update client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/remove-client:
 *   post:
 *     summary: Remove client by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Client ID to remove
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Failed to remove client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 */

// designation

/**
 * @swagger
 * /iemployee/insert-designation:
 *   post:
 *     summary: Insert a new designation
 *     tags: [My Profile]
 *     requestBody:
 *       description: Designation details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               designation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Designation inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Id:
 *                   type: string
 *       400:
 *         description: Failed to insert designation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/alter-designation:
 *   post:
 *     summary: Alter a designation by updating the CreatedBy field
 *     tags: [My Profile]
 *     requestBody:
 *       description: Designation details to alter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               FkEmployeeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Designation altered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Id:
 *                   type: string
 *       400:
 *         description: Failed to alter designation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 */

// domians
/**
 * @swagger
 * /iemployee/domains:
 *   get:
 *     summary: Get all domains
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved domains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Domain'
 *       500:
 *         description: Internal Server Error
 * /iemployee/add-domain:
 *   post:
 *     summary: Add a new domain
 *     tags: [My Profile]
 *     requestBody:
 *       description: Domain details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Domain'
 *     responses:
 *       200:
 *         description: Domain added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 DomainId:
 *                   type: string
 *       400:
 *         description: Failed to add domain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */

// Educations
/**
 * @swagger
 * /iemployee/insert-educations:
 *   post:
 *     summary: Insert a new education
 *     tags: [My Profile]
 *     requestBody:
 *       description: Education details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               education:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Failed to insert education
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 * /iemployee/alter-educations:
 *   post:
 *     summary: Alter an education by updating the CreatedBy field
 *     tags: [My Profile]
 *     requestBody:
 *       description: Education details to alter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               FkEmployeeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education altered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Id:
 *                   type: string
 *       400:
 *         description: Failed to alter education
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 */
// employee client

/**
 * @swagger
 * /iemployee/get-employee-client:
 *   get:
 *     summary: Get all employee clients
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved employee clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 EmpClient:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeClient'
 *       500:
 *         description: Internal Server Error
 * /iemployee/get-employee-client-ByEmployee:
 *   post:
 *     summary: Get employee clients by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to retrieve clients
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee clients by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 ClientId:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeClient'
 *       400:
 *         description: No employee clients found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 ClientId:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeClient'
 *       500:
 *         description: Internal Server Error
  * /iemployee/insert-employee-client:
 *   post:
 *     summary: Insert a new employee client
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee client details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert-EmployeeClient'
 *     responses:
 *       200:
 *         description: Employee client inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 # Include any additional response properties based on your requirements
 *       500:
 *         description: Internal Server Error
  * /iemployee/update-employee-client:
 *   post:
 *     summary: Update employee client by employee and client ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee client details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeClient'
 *     responses:
 *       200:
 *         description: Employee client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Failed to update employee client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/delete-employee-client:
 *   post:
 *     summary: Delete employee client by employee and client ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee and client ID to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */

// employee domian

/**
 * @swagger
 * /iemployee/employeeDomains:
 *   get:
 *     summary: Get all employee domains
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved employee domains
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 empDomains:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDomain'
 *       500:
 *         description: Internal Server Error
 * /iemployee/getdomainsbyid:
 *   post:
 *     summary: Get domains by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to retrieve domains
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved domains by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDomain'
 *       400:
 *         description: No domains found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/get-employee-domains-by-id:
 *   post:
 *     summary: Get employee domains by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to retrieve domains
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee domains by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Domains:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeDomain'
 *       400:
 *         description: No employee domains found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/postdomains:
 *   post:
 *     summary: Insert a new employee domain
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee domain details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert-EmployeeDomain'
 *     responses:
 *       200:
 *         description: Employee domain inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSucces:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/updatedomains:
 *   post:
 *     summary: Update employee domain by employee and domain ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee domain details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeDomain'
 *     responses:
 *       200:
 *         description: Employee domain updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSucces:
 *                   type: boolean
 *       400:
 *         description: Failed to update employee domain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSucces:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/deletedomain:
 *   post:
 *     summary: Delete employee domain by domain ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Domain ID to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee domain deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSucces:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/delete-domains-with-employee-id:
 *   post:
 *     summary: Delete employee domains by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to delete domains
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee domains deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSucces:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */
// profile images

/**
 * @swagger
 * /iemployee/getprofileimages:
 *   get:
 *     summary: Get all profile images
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved profile images
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       400:
 *         description: No profile images found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       500:
 *         description: Internal Server Error
 * /iemployee/get-profile-picture-by-id:
 *   post:
 *     summary: Get profile picture by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to retrieve profile picture
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved profile picture by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       400:
 *         description: No profile picture found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       500:
 *         description: Internal Server Error

 * /iemployee/upload-profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [My Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file

 *               FKEmpId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 profileimage:
 *                   type: string
 *       500:
 *         description: Internal Server Error

 * /iemployee/update-profile-picture:
 *   post:
 *     summary: Update profile picture by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Profile picture details to update
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               FKEmpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       500:
 *         description: Internal Server Error
 * /iemployee/delete-profile-picture:
 *   post:
 *     summary: Delete profile picture by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to delete profile picture
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile picture deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileImage'
 *       500:
 *         description: Internal Server Error
 */
// resumeee

/**
 * @swagger
 * /iemployee/upload-employee-resume:
 *   post:
 *     summary: Upload employee resume
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee resume details to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               FKEmpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResume'
 *       400:
 *         description: Failed to upload employee resume
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResume'
 *       500:
 *         description: Internal Server Error
 * /iemployee/get-employee-resume-by-id:
 *   post:
 *     summary: Get employee resume by employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to retrieve resume
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee resume by employee ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResume'
 *       400:
 *         description: No employee resume found for the specified employee ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResume'
 *       500:
 *         description: Internal Server Error
  * /iemployee/delete-employee-resume:
 *   post:
 *     summary: Delete employee resume by resume ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Resume ID to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee resume deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResume'
 *       500:
 *         description: Internal Server Error
 */
// employee

/**
 * @swagger
 * /iemployee/getemployees:
 *   get:
 *     summary: Get all employees
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 EmpData:
 *                   type: object
 *                   properties:
 *                     recordsets:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ID:
 *                               type: integer
 *                             FIRSTNAME:
 *                               type: string
 *                             LASTNAME:
 *                               type: string
 *                             EMAIL:
 *                               type: string
 *                             COUNTRYCODE:
 *                               type: integer
 *                             PHONENUMBER:
 *                               type: string
 *                             ORGANIZATION:
 *                               type: string
 *                             SPECIALIZATION:
 *                               type: string
 *                             CERTIFICATIONS:
 *                               type: string
 *                             CAREERHIGHLIGHTS:
 *                               type: string
 *                             CAREERSTARTDATE:
 *                               type: string
 *                             REPORTINGTO:
 *                               type: integer
 *                             DESIGNATION:
 *                               type: string
 *                             EDUCATION:
 *                               type: string
 *                           additionalArray:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 // Properties of additionalArray
 *       500:
 *         description: Internal Server Error

 * /iemployee/getbyidemployee:
 *   post:
 *     summary: Get employee by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Employee:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No employee found with the given ID
 *       500:
 *         description: Internal Server Error

 * /iemployee/get-employee-summary-details:
 *   get:
 *     summary: Get summary details of an employee by ID
 *     tags: [My Profile]
 *     parameters:
 *       - in: header
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee summary details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   properties:
 *                     ID:
 *                       type: integer
 *                     FIRSTNAME:
 *                       type: string
 *                     LASTNAME:
 *                       type: string
 *                     EMAIL:
 *                       type: string
 *                     COUNTRYCODE:
 *                       type: integer
 *                     PHONENUMBER:
 *                       type: string
 *                     ORGANIZATION:
 *                       type: string
 *                     SPECIALIZATION:
 *                       type: string
 *                     CERTIFICATIONS:
 *                       type: string
 *                     CAREERHIGHLIGHTS:
 *                       type: string
 *                     CAREERSTARTDATE:
 *                       type: string
 *                     REPORTINGTO:
 *                       type: string  # Assuming REPORTINGTO is a string representing the reporting employee's name
 *                     DESIGNATION:
 *                       type: string
 *                     EDUCATION:
 *                       type: string
 *       500:
 *         description: Internal Server Error

 * /iemployee/get-current-employee-by-id:
 *   get:
 *     summary: Get current employee by ID
 *     tags: [My Profile]
 *     parameters:
 *       - in: header
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Current employee details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   properties:
 *                     Id:
 *                       type: integer
 *                     employeeFirstName:
 *                       type: string
 *                     employeeLastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     countryCode:
 *                       type: integer
 *                     phoneNumber:
 *                       type: string
 *                     organization:
 *                       type: string
 *                     reportingTo:
 *                       type: integer
 *                     location:
 *                       type: integer
 *                     profileImage:
 *                       type: null  # Adjust the type based on the actual data type
 *                     employeeResume:
 *                       type: null  # Adjust the type based on the actual data type
 *                     reportees:
 *                       type: array
 *                       items:
 *                         type: integer
 *                     allocatedEmployees:
 *                       type: array
 *                       items:
 *                         type: integer
 *       500:
 *         description: Internal Server Error

 * /iemployee/get-current-employee-by-mail:
 *   get:
 *     summary: Get current employee by mail
 *     tags: [My Profile]
 *     parameters:
 *       - in: header
 *         name: mail
 *         required: true
 *         description: Employee email address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Current employee details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   properties:
 *                     Id:
 *                       type: integer
 *                     employeeFirstName:
 *                       type: string
 *                     employeeLastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     countryCode:
 *                       type: integer
 *                     phoneNumber:
 *                       type: string
 *                     organization:
 *                       type: string
 *                     reportingTo:
 *                       type: integer
 *                     location:
 *                       type: integer
 *                     profileImage:
 *                       type: null  # Adjust the type based on the actual data type
 *                     employeeResume:
 *                       type: null  # Adjust the type based on the actual data type
 *                     reportees:
 *                       type: array
 *                       items:
 *                         type: integer
 *                     allocatedEmployees:
 *                       type: array
 *                       items:
 *                         type: integer
 *       500:
 *         description: Internal Server Error

 * /iemployee/get-employee-designation:
 *   post:
 *     summary: Get employee designation by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee designation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Designation:
 *                   type: string
 *       400:
 *         description: Invalid request, employee ID is null
 *       500:
 *         description: Internal Server Error

 * /iemployee/postemployee:
 *   post:
 *     summary: Add a new employee
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostEmployeeRequest'
 *     responses:
 *       200:
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEmployeeResponse'
 *       500:
 *         description: Internal Server Error

 * /iemployee/updateemployee:
 *   post:
 *     summary: Update employee details
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeRequest'
 *     responses:
 *       200:
 *         description: Employee details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateEmployeeResponse'
 *       500:
 *         description: Internal Server Error

 * /iemployee/deleteemployee:
 *   post:
 *     summary: Delete an employee by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error

 * /iemployee/getreportingdata:
 *   post:
 *     summary: Get reporting data for an employee by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEMPID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reporting data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReportingDataResponse'
 *       400:
 *         description: No reporting data found with the given ID
 *       500:
 *         description: Internal Server Error
 */


// organisation

/**
 * @swagger
 * /iemployee/getorganization:
 *   get:
 *     summary: Get organizations
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved organizations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationResponse'
 *       500:
 *         description: Internal Server Error
 * /iemployee/insertorg:
 *   post:
 *     summary: Insert organization
 *     tags: [My Profile]
 *     requestBody:
 *       description: Organization details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insert-OrganizationDetails'
 *     responses:
 *       200:
 *         description: Organization inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *
 *
 *       500:
 *         description: Internal Server Error
 */

// practiceArea
/**
 * @swagger
 * /iemployee/insert-practiceArea:
 *   post:
 *     summary: Insert practice area
 *     tags: [My Profile]
 *     requestBody:
 *       description: Practice area details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceArea:
 *                 type: string
 *     responses:
 *       200:
 *         description: Practice area inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PracticeAreaInsertResponse'
 *       500:
 *         description: Internal Server Error
 * /iemployee/alter-practiceArea:
 *   post:
 *     summary: Alter practice area
 *     tags: [My Profile]
 *     requestBody:
 *       description: Practice area details to alter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *               FkEmployeeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Practice area altered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PracticeAreaAlterResponse'
 *       500:
 *         description: Internal Server Error
 */

// procedures
/**
 * @swagger
 * /iemployee/get-initial-details:
 *   post:
 *     summary: Get initial details for employee
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee details to get initial details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKEmpId:
 *                 type: string
 *               NumberOfWeeks:
 *                 type: integer
 *               Year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved initial details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InitialDetailsResponse'
 *       400:
 *         description: Failed to retrieve initial details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InitialDetailsResponse'
 * /iemployee/delete-employee-by-id:
 *   post:
 *     summary: Delete employee by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: Employee ID to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                 type: integer

 *       500:
 *         description: Internal Server Error
 */

// roles
/**
 * @swagger
 * /iemployee/get-user-roles:
 *   get:
 *     summary: Get user roles
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved user roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       Role:
 *                         type: string
 *                       Comment:
 *                         type: string
 *                       Created_by:
 *                         type: null
 *                       Created_dt:
 *                         type: string
 *                         format: date-time
 *                       Updated_by:
 *                         type: null
 *                       Updated_dt:
 *                         type: null
 *       500:
 *         description: Internal Server Error
 */

// users

/**
 * @swagger
 * /iemployee/getuser:
 *   get:
 *     summary: Get user details
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error

 * /iemployee/getuserrole:
 *   get:
 *     summary: Get user roles
 *     tags: [My Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved user roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 UserRoles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID:
 *                         type: integer
 *                       USERNAME:
 *                         type: string
 *                       EMAIL:
 *                         type: string
 *                       PASSWORD:
 *                         type: string
 *                       COUNTRYCODE:
 *                         type: integer
 *                       PHONENUMBER:
 *                         type: string
 *                       ORGANIZATION:
 *                         type: string
 *                       ROLE:
 *                         type: string
 *                       FK_ROLEID:
 *                         type: integer
 *                       ISAPPROVED:
 *                         type: integer
 *                       FK_EMPLOYEEID:
 *                         type: integer
 *       500:
 *         description: Internal Server Error
 

 * /iemployee/check-email:
 *   post:
 *     summary: Check if the email address is valid
 *     tags: [My Profile]
 *     requestBody:
 *       description: Email address to check
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MailAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email address is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 Username:
 *                   type: string
 *       400:
 *         description: Invalid Email Address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error

 * /iemployee/login:
 *   post:
 *     summary: User login
 *     tags: [My Profile]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 User:
 *                   type: object
 *                   properties:
 *                     // Add properties based on your actual user data structure
 *       400:
 *         description: Invalid credentials or not approved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 error_type:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 
 * /iemployee/insertuser:
 *   post:
 *     summary: Insert a new user
 *     tags: [My Profile]
 *     requestBody:
 *       description: User details to insert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               countryCode:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               org:
 *                 type: string
 *               role:
 *                 type: string
 *               IsApproved:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error

 * /iemployee/updateUser:
 *   post:
 *     summary: Update user details
 *     tags: [My Profile]
 *     requestBody:
 *       description: User details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               countryCode:
 *                 type: integer
 *               FKRoleId:
 *                 type: integer
 *               FKEmployeeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error

 * /iemployee/update-is-approve:
 *   post:
 *     summary: Update user approval status
 *     tags: [My Profile]
 *     requestBody:
 *       description: User approval status details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *               EmpId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User approval status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error

 * /iemployee/update-password:
 *   post:
 *     summary: Update user password
 *     tags: [My Profile]
 *     requestBody:
 *       description: User password details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid Credentials
 *       500:
 *         description: Internal Server Error
 * /iemployee/alterempid:
 *   post:
 *     summary: Alter user employee ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: User employee ID details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *               EmpId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User employee ID altered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 * /iemployee/deleteuser:
 *   post:
 *     summary: Delete user by ID
 *     tags: [My Profile]
 *     requestBody:
 *       description: User ID to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 */