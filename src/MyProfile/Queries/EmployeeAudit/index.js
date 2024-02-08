const { handleRunQuery } = require("../../../../config/db/db");

const GetTheLatestInsertedRecordId = async () => {

    const query = `
    SELECT IDENT_CURRENT('EmployeeAudit')
`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')

}


const GetEmployeeAudit = async () => {

    const query = `
    select *
    from EmployeeAudit 
`

    return await handleRunQuery(query, 'GetEmployeeAudit')

};

const InsertEmployeeAudit = async (
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
    Comment,
    Fk_EmployeeId,
    UpdatedStatus,
    location
) => {

    let fname = FirstName.length <= 20 ? FirstName : FirstName.toString().substring(0, 20)
    let lname = LastName.length <= 20 ? LastName : LastName.toString().substring(0, 20)

    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;
    let careerstartdate = `CONVERT(DATETIME, '${CareerStartDate}')`

    const query = `  
        INSERT INTO EmployeeAudit(FirstName,LastName, Email,
        CountryCode,PhoneNumber,Organization,
        FK_DesignationId, FK_PracticeAreaId,FK_EducationId,
        Specialization,Certifications,CareerHighlights,
        CareerStartDate,Fk_EmployeeId,UpdatedStatus,Comment,
        CREATED_BY , CREATED_DT , UPDATED_BY ,UPDATED_DT,LOCATION)
        values('${fname}','${lname}','${Email}',${Number.parseInt(CountryCode)}, ${Number.parseInt(PhoneNumber)},'${Organization}',
        ${FK_DesignationId === null ? FK_DesignationId : Number.parseInt(FK_DesignationId)},
        null,
        ${FK_EducationId === null ? FK_EducationId : Number.parseInt(FK_EducationId)},
        '${Specialization}', '${Certifications}','${CareerHighlights}',${CareerStartDate === null ? null : careerstartdate},
        ${Fk_EmployeeId === null ? Fk_EmployeeId : Number.parseInt(Fk_EmployeeId)},'${UpdatedStatus}','${Comment}', 
        ${Fk_EmployeeId === null ? Fk_EmployeeId : Number.parseInt(Fk_EmployeeId)},
        CONVERT(DATETIME, '${date}'),null,null,${Number.parseInt(location)})
`

    return await handleRunQuery(query, 'InsertEmployeeAudit')

}

module.exports = {
    GetEmployeeAudit,
    GetTheLatestInsertedRecordId,
    InsertEmployeeAudit
}
