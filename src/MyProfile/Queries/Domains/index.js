const { handleRunQuery } = require('../../../../config/db/db')

const GetDomains = async () => {
    const query = `
    select  * from Domains
`
    return await handleRunQuery(query, 'GetDomains')

}
const GetLatestDomainId = async () => {
    const query = `
    select  IDENT_CURRENT('Domains')
`
    return await handleRunQuery(query, 'GetLatestDomainId')

}

const InsertDomain = async (domain, comment, FKId) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO
    DOMAINS(DOMAIN,COMMENT,CREATED_BY,CREATED_dt,UPDATED_BY,UPDATED_dt)
    VALUES('${domain}','${comment} is added',
    ${FKId === null ? null : Number.parseInt(FKId)},
    CONVERT(DATETIME, '${date}'),NULL,NULL)
`
    return await handleRunQuery(query, 'InsertDomain')

}

module.exports = {
    GetDomains,
    InsertDomain,
    GetLatestDomainId
}