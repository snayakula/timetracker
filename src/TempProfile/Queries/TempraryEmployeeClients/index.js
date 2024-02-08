const { handleRunQuery } = require('../../../../config/db/db')

const GetTempEmployeeClients = async () => {

    const query = `
    SELECT * FROM TEMPORARYEMPLOYEESCLIENTS
`

    return await handleRunQuery(query, 'GetTempEmployeeClients')

}

const GetTempEmployeeClientByFKId = async (id) => {

    const query = `
        SELECT * FROM TEMPORARYEMPLOYEESCLIENTS WHERE FK_TempEmployeeId  = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'GetTempEmployeeClientByFKId')

}

const InsertTempEmployeeClient = async (FKTempEmployeeId, FKClientId, Billable) => {

    const dt = new Date();

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `        
    INSERT INTO TEMPORARYEMPLOYEESCLIENTS(FK_TempEmployeeId,
    FK_ClientId,
    Billable,
    CREATED_BY,
    CREATED_DT,
    UPDATED_BY,
    UPDATED_DT) 
    values(${FKTempEmployeeId === null ? FKTempEmployeeId : Number.parseInt(FKTempEmployeeId)},
    ${FKClientId === null ? FKClientId : Number.parseInt(FKClientId)},
    ${Number.parseInt(Billable)},
    ${FKTempEmployeeId === null ? FKTempEmployeeId : Number.parseInt(FKTempEmployeeId)},
    CONVERT(DATETIME, '${date}'),NULL,NULL)
`

    return await handleRunQuery(query, 'InsertTempEmployeeClient')

}

const DeleteTempEmployeeClientByEmployeeId = async (FKId) => {

    const query = `
    DELETE FROM TEMPORARYEMPLOYEESCLIENTS WHERE FK_TEMPEMPLOYEEID  = ${Number.parseInt(FKId)}
`

    return await handleRunQuery(query, 'DeleteTempEmployeeClientByEmployeeId')

}

module.exports = {
    GetTempEmployeeClients,
    GetTempEmployeeClientByFKId,
    InsertTempEmployeeClient,
    DeleteTempEmployeeClientByEmployeeId
} 