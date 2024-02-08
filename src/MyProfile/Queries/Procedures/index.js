const { handleRunQuery } = require('../../../../config/db/db')

const GetInitialDetails = async (FKId, Year) => {

    const query = `
        exec sp_GetDetails @UserFKEmpId = ${FKId}, @CurrentYear = ${Year}
	`

    return await handleRunQuery(query, 'GetInitialDetails')

}

const DeleteEmployeeById = async (id) => {

    const query = `
        exec sp_DeleteEmployee(${Number.parseInt(id)})
	`

    return await handleRunQuery(query, 'DeleteEmployeeById')

}

module.exports = { DeleteEmployeeById, GetInitialDetails }