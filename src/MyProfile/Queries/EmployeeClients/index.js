const { handleRunQuery } = require('../../../../config/db/db')

const GetEmployeeClients = async () => {

    const query = `
    SELECT *
    FROM EMPLOYEECLIENT
`

    return await handleRunQuery(query, 'GetEmployeeClients')


}

const GetEmployeeClientById = async (id) => {

    const query = `
    SELECT *
    FROM EMPLOYEECLIENT ecl
    inner join clients as cl
    on cl.Id = ecl.FK_ClientId
    WHERE ecl.FK_EMPLOYEEID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetEmployeeClientById')

}

const InsertEmployeeClients = async (FKEmpId, FKClientId, Billable) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO
    EMPLOYEECLIENT(FK_EmployeeId, FK_ClientId, BILLABLE ,Created_by,Created_dt,Updated_by,Updated_dt)
    VALUES(${FKEmpId === null ? FKEmpId : Number.parseInt(FKEmpId)}, 
    ${FKClientId === null ? FKClientId : Number.parseInt(FKClientId)}, ${Number.parseInt(Billable)},
    ${FKEmpId === null ? FKEmpId : Number.parseInt(FKEmpId)},CONVERT(DATETIME, '${date}') , NULL,NULL)
`

    return await handleRunQuery(query, 'InsertEmployeeClients')

}

const UpdateEmployeeClientById = async (FKEmpId, FKClientId, Billable) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    UPDATE EMPLOYEECLIENT 
    SET FK_CLIENTID=${Number.parseInt(FKClientId)},
    BILLABLE=${Number.parseInt(Billable)},
    UPDATED_BY = ${Number.parseInt(FKEmpId)},
    UPDATED_DT = CONVERT(DATETIME, '${date}')  
    WHERE FK_EMPLOYEEID = ${Number.parseInt(FKEmpId)}
`

    return await handleRunQuery(query, 'UpdateEmployeeClientById')

}

const DeleteEmployeeClientByFKId = async (FKId) => {

    const query = `
    DELETE FROM EMPLOYEECLIENT
    WHERE FK_EMPLOYEEID = ${Number.parseInt(FKId)}
`

    return await handleRunQuery(query, 'DeleteEmployeeClientByFKId')

}


module.exports = {
    GetEmployeeClients,
    GetEmployeeClientById,
    InsertEmployeeClients,
    UpdateEmployeeClientById,
    DeleteEmployeeClientByFKId
}