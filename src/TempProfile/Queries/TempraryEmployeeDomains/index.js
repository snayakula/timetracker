const { handleRunQuery } = require('../../../../config/db/db')

const GetEmployeeDomains = async () => {

    const query = `
    SELECT  * FROM TEMPORARYEMPLOYEESDOMAINS
`

    return await handleRunQuery(query, 'GetEmployeeDomains')

}

const GetTempEmployeeDomainsByEmployeeId = async (Id) => {

    const query = `
        SELECT  * FROM TEMPORARYEMPLOYEESDOMAINS WHERE FK_TempEmployeeId = ${Id}
	`

    return await handleRunQuery(query, 'GetTempEmployeeDomainsByEmployeeId')

}

const InsertEmpDomain = async (FKEmployeeId, FKDomainId, domainExp) => {

    const dt = new Date();

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
    INSERT INTO 
    TEMPORARYEMPLOYEESDOMAINS(FK_TempEmployeeId, FK_DomainId, DomainExperience, CREATED_BY , CREATED_DT , UPDATED_BY ,UPDATED_DT)
    VALUES(${FKEmployeeId === null ? FKEmployeeId : Number.parseInt(FKEmployeeId)}, ${Number.parseInt(FKDomainId)} , ${Number.parseInt(domainExp)},${FKEmployeeId === null ? FKEmployeeId : Number.parseInt(FKEmployeeId)},CONVERT(DATETIME,'${date}'),NULL,NULL)
`

    return await handleRunQuery(query, 'InsertEmpDomain')

}

const DeleteTempEmployeeDomainById = async (id) => {

    const query = `
        DELETE FROM TEMPORARYEMPLOYEESDOMAINS WHERE ID= ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'DeleteTempEmployeeDomainById')

}

const DeleteTempEmployeeDomainByEmployeeId = async (id) => {

    const query = `
    DELETE FROM TEMPORARYEMPLOYEESDOMAINS WHERE FK_TEMPEMPLOYEEID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'DeleteTempEmployeeDomainByEmployeeId')

}

module.exports = {
    GetEmployeeDomains,
    GetTempEmployeeDomainsByEmployeeId,
    InsertEmpDomain,
    DeleteTempEmployeeDomainById,
    DeleteTempEmployeeDomainByEmployeeId
} 