const { handleRunQuery } = require('../../../../config/db/db')

const GetProfileImages = async () => {

    const query = `
    SELECT *
    FROM EMPLOYEEPROFILE 
`

    return await handleRunQuery(query, 'GetProfileImages')

}

const GetProfileImageById = async (id) => {

    const query = `
    SELECT *
    FROM EMPLOYEEPROFILE 
    WHERE FK_EMPLOYEEID = ${id === null ? null : Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetProfileImageById')

}

const InsertProfileImage = async (filename, id) => {
    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO 
    EMPLOYEEPROFILE(ProfileImage,FK_EMPLOYEEID,CREATED_BY,Created_dt,UPDATED_BY,Updated_dt) 
    values('${filename}',${id === null ? id : Number.parseInt(id)},${id === null ? id : Number.parseInt(id)}, CONVERT(DATETIME, '${date}'), NULL, NULL);
`

    return await handleRunQuery(query, 'InsertProfileImage')

}

const UpdateProfileImage = async (extFilename, id) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    UPDATE EMPLOYEEPROFILE
    SET ProfileImage='${extFilename}',
    UPDATED_BY=${id === null ? id : Number.parseInt(id)},
    Updated_dt=CONVERT(DATETIME, '${date}')
    WHERE FK_EMPLOYEEID= ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'UpdateProfileImage')

}

const DeleteProfileImageByFKId = async (id) => {

    const query = `
        DELETE FROM EMPLOYEEPROFILE WHERE FK_EMPLOYEEID = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'DeleteProfileImageByFKId')

}

module.exports = {
    GetProfileImages,
    GetProfileImageById,
    UpdateProfileImage,
    InsertProfileImage,
    DeleteProfileImageByFKId
}