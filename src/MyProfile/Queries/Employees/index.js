const { handleRunQuery } = require('../../../../config/db/db')

const GetEmployees = async () => {

    const query = `
        SELECT EMP.ID, EMP.FIRSTNAME, EMP.LASTNAME, EMP.EMAIL, EMP.COUNTRYCODE, EMP.PHONENUMBER, EMP.ORGANIZATION, SPECIALIZATION, EMP.CERTIFICATIONS, EMP.CAREERHIGHLIGHTS, EMP.CAREERSTARTDATE, EMP.REPORTINGTO,
        DEG.DESIGNATION,
        EDU.EDUCATION
        FROM EMPLOYEES AS EMP
        INNER JOIN DESIGNATIONS AS DEG
        ON EMP.FK_DESIGNATIONID = DEG.ID
        INNER JOIN EDUCATIONS AS EDU
        ON EMP.FK_HighestEDUCATIONID = EDU.ID
        INNER JOIN EMPLOYEECLIENT AS EMPCLIENT
        ON EMPCLIENT.FK_EMPLOYEEID = EMP.ID
        INNER JOIN CLIENTS AS CLT
        ON CLT.ID = EMPCLIENT.FK_CLIENTID
        ORDER BY EMP.FIRSTNAME
        `

    return await handleRunQuery(query, 'GetEmployees')

}

const GetEmployeeWithId = async (id) => {

    const query = `
    SELECT EMP.ID, EMP.FIRSTNAME, EMP.LASTNAME, EMP.EMAIL, EMP.COUNTRYCODE, EMP.PHONENUMBER, EMP.ORGANIZATION, SPECIALIZATION, EMP.CERTIFICATIONS, EMP.CAREERHIGHLIGHTS, EMP.CAREERSTARTDATE, EMP.REPORTINGTO,
    DEG.DESIGNATION,CLT.CLIENTNAME as CLIENT, EMP.LOCATION,
    EDU.EDUCATION
    FROM EMPLOYEES AS EMP
    INNER JOIN DESIGNATIONS AS DEG
    ON EMP.FK_DESIGNATIONID = DEG.ID
    INNER JOIN EDUCATIONS AS EDU
    ON EMP.FK_HighestEDUCATIONID = EDU.ID
    INNER JOIN EMPLOYEECLIENT AS EMPCLIENT
    ON EMPCLIENT.FK_EMPLOYEEID = EMP.ID
    INNER JOIN CLIENTS AS CLT
    ON CLT.ID = EMPCLIENT.FK_CLIENTID
    WHERE EMP.ID = ${Number.parseInt(id)}
    ORDER BY EMP.FIRSTNAME
        `

    return await handleRunQuery(query, 'GetEmployees')

}

const GetEmployeesOnly = async () => {

    const query = 'select * from employees'

    return await handleRunQuery(query, 'GetEmployeesOnly')

}

const GetEmployeeLatestId = async () => {

    const query = `
       
        SELECT IDENT_CURRENT('Employees')
        
        `

    return await handleRunQuery(query, 'GetEmployeeLatestId')

}

const GetEmployeeById = async (id) => {

    const query = ` 
    SELECT * 
    FROM EMPLOYEES
    WHERE ID = ${Number.parseInt(id)}`

    return await handleRunQuery(query, 'GetEmployeeById')

}

const GetEmployeeByMailAddress = async (mail) => {

    const query = ` 
    SELECT *
    FROM EMPLOYEES
    WHERE Email = '${mail}'`

    return await handleRunQuery(query, 'GetEmployeeByMailAddress')

}

const GetEmployeeDesignationById = async (id) => {

    const query = ` 
    SELECT deg.Designation
    FROM EMPLOYEES as emp
    inner join Designations as deg
    on deg.Id = emp.FK_DesignationId
    WHERE emp.ID = ${Number.parseInt(id)}`

    return await handleRunQuery(query, 'GetEmployeeDesignationById')

}

const GetReportingdataId = async (FKEmpId) => {

    const query = ` 
    SELECT ID FROM EMPLOYEES WHERE REPORTINGTO = ${Number.parseInt(FKEmpId)}
`

    return await handleRunQuery(query, 'GetReportingdataId')

}

const InsertEmployee = async (FirstName,
    LastName,
    Email,
    PhoneNumber,
    CountryCode,
    Organization,
    FK_DesignationId,
    FK_EducationId,
    Specialization,
    Certifications,
    CareerHighlights,
    CareerStartDate,
    ReportingTo,
    Location
) => {

    let fname = FirstName.length <= 20 ? FirstName : FirstName.toString().substring(0, 20)
    let lname = LastName.length <= 20 ? LastName : LastName.toString().substring(0, 20)

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    let careerstartdate = CareerStartDate === null ? null : `CONVERT(DATETIME, '${CareerStartDate}')`

    const query = `

    INSERT INTO
    EMPLOYEES(FIRSTNAME,LASTNAME,EMAIL,COUNTRYCODE,PHONENUMBER,ORGANIZATION,FK_DesignationId,FK_PRACTICEAREAID,FK_HighestEducationId,SPECIALIZATION,CERTIFICATIONS,
    CAREERHIGHLIGHTS,CAREERSTARTDATE,REPORTINGTO,Created_by,Created_dt,Updated_by,Updated_dt,Location)
    VALUES('${fname}','${lname}','${Email}',${Number.parseInt(CountryCode)},${Number.parseInt(PhoneNumber)},
    '${Organization}',${FK_DesignationId === null ? FK_DesignationId : Number.parseInt(FK_DesignationId)},
    ${null},
    ${FK_EducationId === null ? FK_EducationId : Number.parseInt(FK_EducationId)},'${Specialization}',
    '${Certifications}','${CareerHighlights}',${CareerStartDate === null ? null : careerstartdate},
    ${ReportingTo === null ? ReportingTo : Number.parseInt(ReportingTo)},Null,CONVERT(DATETIME, '${date}'), NULL, NULL,'${Number.parseInt(Location)}')

    `

    return await handleRunQuery(query, 'InsertEmployee')

}

const UpdateEmployeeById = async (Id, firstName, lastName, email, org, countryCode, phoneNumber,
    designationId, educationId, specialization, certifications, careerHighlights, careerStartDate, REPORTEDTO, location) => {


    let fname = firstName.length <= 20 ? firstName : firstName.toString().substring(0, 20)
    let lname = lastName.length <= 20 ? lastName : lastName.toString().substring(0, 20)


    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
        UPDATE EMPLOYEES
        SET FIRSTNAME = '${fname}', LASTNAME = '${lname}', EMAIL = '${email}', Organization = '${org}',
        COUNTRYCODE = ${Number.parseInt(countryCode)}, PHONENUMBER = ${Number.parseInt(phoneNumber)}, 
        FK_DESIGNATIONID = ${Number.parseInt(designationId)}, FK_PRACTICEAREAID = null,
        FK_HighestEDUCATIONID = ${educationId}, SPECIALIZATION = '${specialization}', CERTIFICATIONS = '${certifications}', 
        CAREERHIGHLIGHTS = '${careerHighlights}', CAREERSTARTDATE = '${careerStartDate}', REPORTINGTO = ${Number.parseInt(REPORTEDTO)},
        Updated_by = ${Number.parseInt(Id)}, Updated_dt = '${date}', Location = ${Number.parseInt(location)}
        WHERE ID = ${Number.parseInt(Id)}
        `

    return await handleRunQuery(query, 'UpdateEmployeeById')

}

const UpdateEmployeeManager = async (managerId, employeeMail) => {

    const query = `

    UPDATE employees
    SET ReportingTo = ${Number.parseInt(managerId)} 
    WHERE email = '${employeeMail}'

`

    return await handleRunQuery(query, 'UpdateEmployeeManager')

}

const DeleteEmployeeById = async (id) => {

    const query = ` 
    DELETE FROM EMPLOYEES
    WHERE ID  = ${Number.parseInt(id)}
    `

    return await handleRunQuery(query, 'DeleteEmployeeById')

}

module.exports = {
    GetEmployees,
    GetEmployeeById,
    GetEmployeesOnly,
    GetEmployeeDesignationById,
    InsertEmployee,
    UpdateEmployeeById,
    DeleteEmployeeById,
    GetEmployeeLatestId,
    GetReportingdataId,
    GetEmployeeByMailAddress,
    UpdateEmployeeManager,
    GetEmployeeWithId
}