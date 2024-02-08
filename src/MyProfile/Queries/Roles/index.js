const { handleRunQuery } = require('../../../../config/db/db')

const GetRoles = async () => {

    const query = `
    SELECT * FROM ROLES
`

    return await handleRunQuery(query, 'GetRoles')

}


module.exports = { GetRoles }