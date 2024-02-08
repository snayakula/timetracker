const { handleRunQuery } = require("../../../../config/db/db");

const GetTempEmployeeData = async () => {

    const query = `
        SELECT * FROM TEMPORARYEMPLOYEES 
	`

    return await handleRunQuery(query, 'GetTempEmployeeData')

};

const GetTheLatestInsertedRecordId = async () => {

    const query = `
    SELECT IDENT_CURRENT('TemporaryEmployees')
`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')

};

const GetLatestTempEmployeeId = async () => {

    const query = `
    SELECT IDENT_CURRENT('TemporaryEmployees')
	`

    return await handleRunQuery(query, 'GetLatestTempEmployeeId')

};

const GetTempEmployeeDataById = async (Id) => {

    const query = `
    SELECT *
    FROM TEMPORARYEMPLOYEES
    WHERE ID = ${Id}
`

    return await handleRunQuery(query, 'GetTempEmployeeDataById')

};

const GetTempEmployeeDataByEmployeeId = async (Fk_EmployeeId) => {

    const query = `
        select *
        from TemporaryEmployees
        where FK_EmployeeId = ${Fk_EmployeeId}
	`

    return await handleRunQuery(query, 'GetTempEmployeeDataByEmployeeId')

};
const GetTempEmployeeDataByEmployeeMail = async (mail) => {

    const query = `
        select *
        from TemporaryEmployees
        where Email = '${mail}'
	`

    return await handleRunQuery(query, 'GetTempEmployeeDataByEmployeeMail')

};

const InsertTempEmployeeData = async (
    FirstName,
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
    FK_EmployeeId,
    isApprove,
    Comment,
    ReportingTo,
    location
) => {

    const dt = new Date();

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        INSERT INTO TemporaryEmployees(FirstName,LastName, Email,
        CountryCode,PhoneNumber,Organization,
        FK_DesignationId, FK_PracticeAreaId,
        FK_EducationId,Specialization, Certifications,
        CareerHighlights, CareerStartDate,ReportingTo,FK_EmployeeId,
        isApprove,Comment,CREATED_BY ,
        CREATED_DT , UPDATED_BY ,UPDATED_DT,LOCATION) 
        values('${FirstName}','${LastName}','${Email}',${Number.parseInt(CountryCode)}, ${Number.parseInt(PhoneNumber)},'${Organization}',
        ${FK_DesignationId === null ? FK_DesignationId : Number.parseInt(FK_DesignationId)},${null},
        ${FK_EducationId === null ? FK_EducationId : Number.parseInt(FK_EducationId)},
        '${Specialization}', '${Certifications}','${CareerHighlights}','${CareerStartDate}',${ReportingTo === null ? ReportingTo : Number.parseInt(ReportingTo)},
        ${FK_EmployeeId === null ? FK_EmployeeId : Number.parseInt(FK_EmployeeId)},${Number.parseInt(isApprove)},'${Comment}',
        ${FK_EmployeeId === null ? FK_EmployeeId : Number.parseInt(FK_EmployeeId)},CONVERT(DATETIME, '${date}'),null,null, ${Number.parseInt(location)})
`

    return await handleRunQuery(query, 'InsertTempEmployeeData')

};

const UpdateTempEmployeeData = async (
    Id,
    FirstName,
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
    FK_EmployeeId,
    isApprove,
    Comment,
    reportingTo,
    location
) => {
    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        update TemporaryEmployees set firstName = '${FirstName}', lastName = '${LastName}', email = '${Email}',
        countryCode = '${CountryCode}', Organization = '${Organization}', phoneNumber = ${Number.parseInt(PhoneNumber)},
        FK_DesignationId =${FK_DesignationId === null ? FK_DesignationId : Number.parseInt(FK_DesignationId)},
        FK_PracticeAreaId = ${null},
        FK_EducationId =${FK_EducationId === null ? FK_EducationId : Number.parseInt(FK_EducationId)},
        ReportingTo = ${reportingTo === null ? null : Number.parseInt(reportingTo)},
        specialization = '${Specialization}', certifications = '${Certifications}', careerHighlights = '${CareerHighlights}',
        careerstartdate = '${CareerStartDate}',
        Fk_EmployeeId = ${FK_EmployeeId === null ? FK_EmployeeId : Number.parseInt(FK_EmployeeId)}, isApprove = ${isApprove},
        comment = '${Comment}',Updated_by =${FK_EmployeeId === null ? FK_EmployeeId : Number.parseInt(FK_EmployeeId)},
        Updated_dt = CONVERT(DATETIME, '${date}'),
        LOCATION = ${Number.parseInt(location)}
        where Id = ${Number.parseInt(Id)}
    `

    return await handleRunQuery(query, 'UpdateTempEmployeeData')

};

const UpdateIsApproveTempEmployee = async (Id, isApprove) => {

    const query = `
        update TemporaryEmployees
        set isApprove= ${Number.parseInt(isApprove)}
        where Id = ${Id}
	`

    return await handleRunQuery(query, 'UpdateIsApproveTempEmployee')


};

const DeleteTempEmployeeById = async (id) => {

    const query = `
    DELETE FROM TEMPORARYEMPLOYEES WHERE ID = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'DeleteTempEmployeeById')

};

module.exports = {
    GetTempEmployeeData,
    InsertTempEmployeeData,
    DeleteTempEmployeeById,
    GetTempEmployeeDataById,
    UpdateIsApproveTempEmployee,
    GetTempEmployeeDataByEmployeeId,
    UpdateTempEmployeeData,
    GetLatestTempEmployeeId,
    GetTheLatestInsertedRecordId,
    GetTempEmployeeDataByEmployeeMail
}