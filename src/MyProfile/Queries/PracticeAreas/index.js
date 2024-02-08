const { handleRunQuery } = require('../../../../config/db/db')

const GetTheLatestInsertedRecordId = async () => {

    const query = `
        SELECT IDENT_CURRENT('PRACTICEAREAS')
	`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')

}

const InsertPracticeArea = async (pracname) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO 
    PRACTICEAREAS(PRACTICEAREA,COMMENT,CREATEDBY,CREATEDWHEN,UPDATEDBY,UPDATEDWHEN)
    VALUES('${pracname}','${pracname} is added',NULL,CONVERT(DATETIME, '${date}'),NULL,NULL)
`

    return await handleRunQuery(query, 'InsertPracticeArea')

}

const AlterCreatedByPracticearea = async (Id, FkEmployeeId) => {

    const query = `
    UPDATE PRACTICEAREA
    SET CREATED_BY = ${Number.parseInt(FkEmployeeId)}
    WHERE ID = ${Number.parseInt(Id)}
`

    return await handleRunQuery(query, 'AlterCreatedByPracticearea')

}


module.exports = { InsertPracticeArea, AlterCreatedByPracticearea, GetTheLatestInsertedRecordId }