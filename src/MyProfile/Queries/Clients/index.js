
const { handleRunQuery } = require('../../../../config/db/db')

const GetClients = async () => {

    const query = `
    SELECT * FROM CLIENTS;
`
    return await handleRunQuery(query, 'GetClients')

}

const CheckClient = async (clientname) => {

    const query = `
    SELECT * 
    FROM CLIENTS 
    WHERE CLIENTNAME = '${clientname}'
`

    return await handleRunQuery(query, 'CheckClient')
}

const GetClientById = async (id) => {

    const query = `
    SELECT * 
    FROM CLIENTS 
    WHERE ID = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetClientById')
}

const InsertClient = async (
    ClientName,
    TypeOfContract,
    GenzeonPOC,
    ClientPOC,
    ProjectManager,
    FKEmployeeId
) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
        INSERT INTO CLIENTS(ClientName,TypeOfContract,GenzeonPOC,ClientPOC,PROJECTMANAGER,Created_by,Created_dt,Updated_by,Updated_dt)
       VALUES('${ClientName}','${TypeOfContract}','${GenzeonPOC}','${ClientPOC}', '${ProjectManager}',
       ${FKEmployeeId === null ? FKEmployeeId : Number.parseInt(FKEmployeeId)}, 
       CONVERT(DATETIME, '${date}'), NULL, NULL);
	`

    return await handleRunQuery(query, 'InsertClient')
}

const UpdateClientById = async (id, ClientName, TypeOfContract, GenzeonPOC, ClientPOC, projectmanager, FKEmployeeId) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    UPDATE CLIENTS SET ClientName= '${ClientName}', TypeOfContract = '${TypeOfContract}',
    GenzeonPOC = '${GenzeonPOC}', ClientPOC = '${ClientPOC}',
    PROJECTMANAGER = '${projectmanager}',
    Updated_by = ${FKEmployeeId === null ? FKEmployeeId : Number.parseInt(FKEmployeeId)},
    Updated_dt = CONVERT(DATETIME, '${date}') WHERE ID = ${Number.parseInt(id)}
`
    return await handleRunQuery(query, 'UpdateClientById')

}

const DeleteClientById = async (id) => {

    const query = `
    DELETE FROM CLIENTS 
    WHERE ID = ${Number.parseInt(id)}
`
    return await handleRunQuery(query, 'DeleteClientById')
}

module.exports = {
    GetClients,
    GetClientById,
    InsertClient,
    UpdateClientById,
    DeleteClientById,
    CheckClient
}