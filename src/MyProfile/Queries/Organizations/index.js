const { handleRunQuery } = require('../../../../config/db/db')

const GetOrganizations = async () => {

    const query = `
    SELECT * FROM ORGANIZATIONS
	`

    return await handleRunQuery(query, 'GetOrganizations')

}

const InsertOrganization = async (org) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO 
    ORGANIZATIONS(ORGANIZATION,CREATEDBY,CREATEDWHEN,UPDATEDBY,UPDATEDWHEN)
    VALUES('${org}',NULL,CONVERT(DATETIME, '${date}'),NULL,NULL)
`

    return await handleRunQuery(query, 'InsertOrganization')

}

module.exports = { GetOrganizations, InsertOrganization }