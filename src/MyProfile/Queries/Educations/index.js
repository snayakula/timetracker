const { handleRunQuery } = require('../../../../config/db/db')

const GetTheLatestInsertedRecordId = async () => {

    const query = `
        SELECT IDENT_CURRENT('EDUCATIONS')
	`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')

}

const CheckEducation = async (education) => {

    const query = `
        SELECT * 
        FROM EDUCATIONS
        WHERE EDUCATION = '${education}'
	`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')

}

const InsertEducations = async (eduname) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO 
    EDUCATIONS(EDUCATION,COMMENT,CREATED_BY,CREATED_DT,UPDATED_BY,UPDATED_DT)
    VALUES('${eduname}','${eduname} is added',NULL,CONVERT(DATETIME, '${date}'),NULL,NULL)
`

    return await handleRunQuery(query, 'InsertEducations')


}

const AlterCreatedByEducation = async (Id, FkEmployeeId) => {

    const query = `
        UPDATE EDUCATIONS
        SET CREATED_BY = ${Number.parseInt(FkEmployeeId)}
        WHERE ID = ${Number.parseInt(Id)}
	`

    return await handleRunQuery(query, 'AlterCreatedByEducation')

}

module.exports = {
    InsertEducations,
    CheckEducation,
    AlterCreatedByEducation,
    GetTheLatestInsertedRecordId
}