/**
 * @swagger
 *
 *  tags:
 *      name: Temporary Employee Profile
 *      description: Temporary Employee Profile routes are used for My Profile module in iEmployee
 *
 *
 *
 *
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     TempClient:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *         FK_TempEmployeeId:
 *           type: integer
 *         FK_ClientId:
 *           type: integer
 *         Billable:
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
 *
 *     TempEmployeeDomain:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         FK_TempEmployeeId:
 *           type: integer
 *         FK_DomainId:
 *           type: integer
 *         DomainExperience:
 *           type: string
 *
 *     AddTempEmployeeDomainRequest:
 *       type: object
 *       properties:
 *         FK_TempEmployeeId:
 *           type: integer
 *         FK_DomainId:
 *           type: integer
 *         DomainExperience:
 *           type: string
 *

 *     TempEmployee:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *           description: Employee ID
 *         FirstName:
 *           type: string
 *           description: First name of the employee
 *         LastName:
 *           type: string
 *           description: Last name of the employee
 *         Email:
 *           type: string
 *           description: Email address of the employee
 *         PhoneNumber:
 *           type: string
 *           description: Phone number of the employee
 *         CountryCode:
 *           type: string
 *           description: Country code of the employee's phone number
 *         Organization:
 *           type: string
 *           description: Organization where the employee works
 *         FK_DesignationId:
 *           type: integer
 *           description: Designation ID of the employee
 *         FK_PracticeAreaId:
 *           type: integer
 *           description: Practice area ID of the employee
 *         FK_EducationId:
 *           type: integer
 *           description: Education ID of the employee
 *         Specialization:
 *           type: string
 *           description: Specialization of the employee
 *         Certifications:
 *           type: string
 *           description: Certifications held by the employee
 *         CareerHighlights:
 *           type: string
 *           description: Career highlights of the employee
 *         CareerStartDate:
 *           type: string
 *           description: Career start date of the employee
 *         Fk_EmployeeId:
 *           type: integer
 *           description: Fk_EmployeeId
 *         isApprove:
 *           type: boolean
 *           description: Approval status
 *         Comment:
 *           type: string
 *           description: Comments related to the employee
 *         UpdatedStatus:
 *           type: string
 *           description: Updated status
 *
 *     InsertTempEmployeeRequest:
 *       type: object
 *       properties:
 *         FirstName:
 *           type: string
 *           description: First name of the employee
 *         LastName:
 *           type: string
 *           description: Last name of the employee
 *         Email:
 *           type: string
 *           description: Email address of the employee
 *         PhoneNumber:
 *           type: string
 *           description: Phone number of the employee
 *         CountryCode:
 *           type: string
 *           description: Country code of the employee's phone number
 *         Organization:
 *           type: string
 *           description: Organization where the employee works
 *         FK_DesignationId:
 *           type: integer
 *           description: Designation ID of the employee
 *         FK_PracticeAreaId:
 *           type: integer
 *           description: Practice area ID of the employee
 *         FK_EducationId:
 *           type: integer
 *           description: Education ID of the employee
 *         Specialization:
 *           type: string
 *           description: Specialization of the employee
 *         Certifications:
 *           type: string
 *           description: Certifications held by the employee
 *         CareerHighlights:
 *           type: string
 *           description: Career highlights of the employee
 *         CareerStartDate:
 *           type: string
 *           description: Career start date of the employee
 *         Fk_EmployeeId:
 *           type: integer
 *           description: Fk_EmployeeId
 *         isApprove:
 *           type: boolean
 *           description: Approval status
 *         Comment:
 *           type: string
 *           description: Comments related to the employee
 *         UpdatedStatus:
 *           type: string
 *           description: Updated status
 *
 *     ApproveEmployeeRequest:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: ID of the temporary employee to be approved
 *         FKEmpId:
 *           type: string
 *           description: ID of the original employee (if applicable)
 *         Comment:
 *           type: string
 *           description: Comment related to the approval
 *         UpdatedStatus:
 *           type: string
 *           description: Updated status of the employee
 *
 *     ApproveEmployeeResponse:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: ID of the approved employee
 *         submitted:
 *           type: boolean
 *           description: Indicates if the approval was submitted successfully
 *         isSuccess:
 *           type: boolean
 *           description: Indicates if the approval was successful
 *
 *     RejectEmployeeRequest:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: ID of the temporary employee to be rejected
 *         comment:
 *           type: string
 *           description: Comment related to the rejection
 *         updatedStatus:
 *           type: string
 *           description: Updated status of the employee
 *
 *
 */


// temp clients

/**
 * @swagger
 * paths:
 *  /temp-iemployee/temp-get-clients:
 *   get:
 *     summary: Get temporary employee clients
 *     tags: [Temporary Employee Profile]
 *     responses:
 *       200:
 *         description: List of temporary employee clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 temp_Clients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       FK_TempEmployeeId:
 *                         type: integer
 *                       FK_ClientId:
 *                         type: integer
 *                       Billable:
 *                         type: integer
 *                       Created_by:
 *                         type: integer
 *                       Created_dt:
 *                         type: string
 *                         format: date-time
 *                       Updated_by:
 *                         type: integer
 *                       Updated_dt:
 *                         type: string
 *                         format: date-time
 *  /temp-iemployee/get-temp-employee-client-by-emp-id:
 *   post:
 *     summary: Get temporary employee client by employee ID
 *     tags: [Temporary Employee Profile]
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
 *         description: Temporary employee client retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       // Properties of ClientId
 *       500:
 *         description: Internal Server Error
 *  /temp-iemployee/insert-temp-employee-client:
 *   post:
 *     summary: Insert temporary employee client
 *     tags: [Temporary Employee Profile]
 *     requestBody:
 *       description: Temporary employee client details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FK_TempEmployeeId:
 *                 type: integer
 *               FK_ClientId:
 *                 type: integer
 *               Billable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Temporary employee client inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Properties of the response
 *       500:
 *         description: Internal Server Error
 *  /temp-iemployee/delete-temp-employee-client:
 *   post:
 *     summary: Delete temporary employee client
 *     tags: [Temporary Employee Profile]
 *     requestBody:
 *       description: Temporary employee client details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Temporary employee client deleted successfully
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

// temp domain

/**
 * @swagger
 * paths:
 *   /temp-iemployee/domains:
 *     get:
 *       summary: Get all temporary employee domains
 *       tags: [Temporary Employee Profile]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                   temp_employee_domains:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/TempEmployeeDomain'
 *
 *   /temp-iemployee/get-temp-employee-domain-by-id:
 *     post:
 *       summary: Get temporary employee domain by ID
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                   temp_employee_domain:
 *                     $ref: '#/components/schemas/TempEmployeeDomain'
 *
 *   /temp-iemployee/add-temp-employee-domain:
 *     post:
 *       summary: Add temporary employee domain
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddTempEmployeeDomainRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                   data:
 *                     $ref: '#/components/schemas/TempEmployeeDomain'
 *
 *   /temp-iemployee/delete-temp-domains-with-employee-id:
 *     post:
 *       summary: Delete temporary employee domains by ID
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 */

// temp employeee

/**
 * @swagger
 * paths:
 *   /temp-iemployee/get-temp-employees:
 *     get:
 *       summary: Get all temporary employees
 *       tags: [Temporary Employee Profile]
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                   empData:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/TempEmployee'
 *
 *   /temp-iemployee/get-temp-employee-by-id:
 *     post:
 *       summary: Get temporary employee by ID
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                   TempEmployee:
 *                     $ref: '#/components/schemas/TempEmployee'
 *
 *   /temp-iemployee/insert-temp-employee:
 *     post:
 *       summary: Insert a temporary employee
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsertTempEmployeeRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Id:
 *                     type: string
 *                   submitted:
 *                     type: boolean
 *
 *   /temp-iemployee/delete-temp-employee:
 *     post:
 *       summary: Delete temporary employee
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *   /temp-iemployee/approve-employee:
 *     post:
 *       summary: Approve a temporary employee
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApproveEmployeeRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApproveEmployeeResponse'
 *
 *   /temp-iemployee/reject-employee:
 *     post:
 *       summary: Reject a temporary employee
 *       tags: [Temporary Employee Profile]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RejectEmployeeRequest'
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   isSuccess:
 *                     type: boolean
 *                     description: Indicates if the rejection was successful
 */