const { handleRunQuery } = require('../../../../config/db/db')

const GetEmployeeDomains = async () => {

    const query = `
    SELECT * FROM EMPLOYEEDOMAIN
`

    return await handleRunQuery(query, 'GetEmployeeDomains')


}

const GetEmployeeDomainsByFKId = async (id) => {

    const query = `
    SELECT EMPDOM.ID, EMPDOM.FKEMPLOYEEID, EMPDOM.FKDOMAINID, EMPDOM.DOMAIN, EMPDOM.DOMAINEXP
    FROM EMPLOYEEDOMAIN AS EMPDOM
    INNER JOIN DOMAINS AS DOM
    ON DOM.ID = EMPDOM.FKDOMAINID
    WHERE EMPDOM.FKEMPID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetEmployeeDomainsByFKId')

}

const GetEmployeeDomainByFKEmpId = async (id) => {

    const query = `
    SELECT * 
    FROM EMPLOYEEDOMAIN as ed
    inner join domains as d
    on d.Id = ed.FK_DomainId
    WHERE FK_EMPLOYEEID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetEmployeeDomainByFKEmpId')

}

const InsertEmployeeDomain = async (FKEmpId, FKDomainId, domainExp) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
        INSERT INTO
        EMPLOYEEDOMAIN(FK_EMPLOYEEID, FK_DOMAINID, DomainExperience, Created_by,Created_dt,Updated_by,Updated_dt)
        VALUES(${FKEmpId === null ? FKEmpId : Number.parseInt(FKEmpId)},
        ${FKDomainId === null ? FKDomainId : Number.parseInt(FKDomainId)},
        ${Number.parseInt(domainExp)},
        ${FKEmpId === null ? FKEmpId : Number.parseInt(FKEmpId)},CONVERT(DATETIME,'${date}'),
        NULL,NULL)
	`

    return await handleRunQuery(query, 'InsertEmployeeDomain')

}

const UpdateEmployeeDomains = async (FKEmpId, domainId, domainExp) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO EMPLOYEEDOMAIN(FKEMPLOYEEID,FKDOMAINID,DomainExperience,CREATEDBY,CREATEDWHEN,UPDATEDBY,UPDATEDWHEN)
    VALUES(${Number.parseInt(FKEmpId)}, ${Number.parseInt(domainId)}, ${Number.parseInt(domainExp)},${Number.parseInt(FKEmpId)},CONVERT(DATETIME,'DATE'),NULL.NULL)
`

    return await handleRunQuery(query, 'UpdateEmployeeDomains')

}

const DeleteEmployeeDomainById = async (id) => {

    const query = `

        DELETE FROM
        EMPLOYEEDOMAIN
        WHERE ID = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'DeleteEmployeeDomainById')

}

const DeleteEmployeeDomainByEmployeeId = async (id) => {

    const query = `
    DELETE FROM
    EMPLOYEEDOMAIN
    WHERE FK_EMPLOYEEID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'DeleteEmployeeDomainByEmployeeId')

}

module.exports = {
    GetEmployeeDomains,
    GetEmployeeDomainsByFKId,
    GetEmployeeDomainByFKEmpId,
    InsertEmployeeDomain,
    UpdateEmployeeDomains,
    DeleteEmployeeDomainByEmployeeId,
    DeleteEmployeeDomainById
}