const { handleRunQuery } = require('../../../../config/db/db')

const GetTheLatestInsertedRecordId = async () => {

    const query = `
        SELECT IDENT_CURRENT('DESIGNATIONS')
	`

    return await handleRunQuery(query, 'GetTheLatestInsertedRecordId')
}

const CheckDesignation = async (Designaiton) => {

    const query = `
    SELECT *
    FROM DESIGNATIONS
    WHERE DESIGNATION = '${Designaiton}'
`

    return await handleRunQuery(query, 'CheckDesignation')
}

const InsertDesignations = async (designationName) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO 
    DESIGNATIONS(DESIGNATION,COMMENT,CREATED_BY,CREATED_DT,UPDATED_BY,UPDATED_DT)
    VALUES('${designationName}','${designationName} is added',NULL,CONVERT(DATETIME, '${date}')
    ,NULL,NULL)
`
    return await handleRunQuery(query, 'InsertDesignations')
}

const AlterCreatedByDesignation = async (Id, FkEmployeeId) => {

    const query = `
    UPDATE DESIGNATIONS
    SET CREATEDBY = ${FkEmployeeId === null ? FkEmployeeId : Number.parseInt(FkEmployeeId)}
    WHERE ID = ${Number.parseInt(Id)}
`

    return await handleRunQuery(query, 'AlterCreatedByDesignation')
}

module.exports = {
    GetTheLatestInsertedRecordId,
    InsertDesignations,
    AlterCreatedByDesignation,
    CheckDesignation
}