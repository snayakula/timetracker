const { handleRunQuery } = require("../../../../config/db/db");

const GetUser = async () => {

    const query = `
        SELECT * FROM USERS
	`

    return await handleRunQuery(query, 'GetUser')

}

const GetUserAndRoles = async () => {

    const query = `
        
    SELECT US.ID, US.USERNAME, US.EMAIL, US.PASSWORD, US.COUNTRYCODE, US.PHONENUMBER, US.ORGANIZATION, RL.ROLE,
    US.FK_ROLEID, US.ISAPPROVED , US.FK_EMPLOYEEID
    FROM USERS AS US
    INNER JOIN ROLES AS RL
    ON US.FK_ROLEID = RL.ID
    ORDER BY US.USERNAME
	`

    return await handleRunQuery(query, 'GetUserAndRoles')

}

const GetUserById = async (id) => {

    const query = `
        SELECT US.Id,username, email, password,countryCode,
        phoneNumber, organization, role, US.FK_ROLEID as FkRoleId, US.FK_EMPLOYEEID as FKEmpId,
        US.IsApproved,
        US.CREATED_BY,
        US.CREATED_DT,
        US.UPDATED_BY,
        US.UPDATED_DT
        FROM USERS AS US
        INNER JOIN ROLES AS ROLES
        ON US.FK_ROLEID = ROLES.ID
        WHERE US.ID =  ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'GetUserById')

}

const GetUserByUsername = async (username) => {

    const query = `
    SELECT US.Id,username, email, password,countryCode,
    phoneNumber, organization, role, US.FK_ROLEID as FkRoleId, US.FK_EMPLOYEEID as FKEmpId,US.IsApproved, 
    US.CREATED_BY,
    US.CREATED_DT,
    US.UPDATED_BY,
    US.UPDATED_DT
    FROM USERS AS US
    INNER JOIN ROLES AS ROLE
    ON US.FK_ROLEID = ROLE.ID
    WHERE US.USERNAME = '${username}'
`

    return await handleRunQuery(query, 'GetUserByUsername')

}

const GetUserByEmail = async (email) => {

    const query = `
    SELECT US.Id,username, email, password,countryCode,
    phoneNumber, organization, role, US.FK_ROLEID as FkRoleId, US.FK_EMPLOYEEID as FKEmpId,US.IsApproved, 
    US.CREATED_BY,
    US.CREATED_DT,
    US.UPDATED_BY,
    US.UPDATED_DT
    FROM USERS AS US
    INNER JOIN ROLES AS ROLE
    ON US.FK_ROLEID = ROLE.ID
    WHERE email = '${email}'
`

    return await handleRunQuery(query, 'GetUserByEmail')

}

const GetUserRoles = async () => {

    const query = `
        SELECT * FROM ROLES
	`

    return await handleRunQuery(query, 'GetUserRoles')

}

const InsertUserData = async (
    username,
    email,
    password,
    countryCode,
    phoneNumber,
    org,
    role,
    IsApproved,
    FKEmpId
) => {

    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        INSERT INTO USERS(USERNAME, EMAIL, PASSWORD,COUNTRYCODE, PHONENUMBER, ORGANIZATION, FK_ROLEID, FK_EMPLOYEEID,ISAPPROVED , CREATED_BY,
        CREATED_DT,
        UPDATED_BY,
        UPDATED_DT) 
        VALUES('${username}','${email}','${password}',${Number.parseInt(countryCode)},
        ${phoneNumber},'${org}',${role}, ${FKEmpId}, ${IsApproved},
        NULL,CONVERT(DATETIME, '${date}'),NULL,NULL)
	`

    return await handleRunQuery(query, 'InsertUserData')

}

const UpdateIsApprove = async (id, EmpId) => {

    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
    UPDATE USERS
    SET ISAPPROVED = ${1},
    UPDATED_BY = ${EmpId === null ? EmpId : Number.parseInt(EmpId)},
    UPDATED_DT = CONVERT(DATETIME, '${date}')
    WHERE ID=${Number.parseInt(id)} 
`

    return await handleRunQuery(query, 'UpdateIsApprove')

}

const UpdateUserById = async (
    id,
    username,
    email,
    phoneNumber,
    countryCode,
    FKRoleId,
    FKEMPLOYEEID
) => {
    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        UPDATE USERS 
        SET USERNAME = '${username}', EMAIL = '${email}',
        PHONENUMBER = ${Number.parseInt(phoneNumber)},
        COUNTRYCODE = ${Number.parseInt(countryCode)},
        FK_ROLEID = ${Number.parseInt(FKRoleId)},
        UPDATED_BY = ${FKEMPLOYEEID === null ? FKEMPLOYEEID : Number.parseInt(FKEMPLOYEEID)},
        UPDATED_DT = CONVERT(DATETIME, '${date}')
        WHERE ID = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'UpdateUserById')

}

const UpdateUserPassword = async (username, password) => {

    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        UPDATE USERS 
        SET PASSWORD = '${password}',
        UPDATED_DT = CONVERT(DATETIME, '${date}')
        WHERE USERNAME = '${username}'
	`

    return await handleRunQuery(query, 'UpdateUserPassword')

}

const AlterUser = async (Id, EmpId) => {

    const dt = new Date();
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        UPDATE USERS
        SET FK_EMPLOYEEID = ${Number.parseInt(EmpId)},
        UPDATED_BY = ${EmpId === null ? EmpId : Number.parseInt(EmpId)},
        UPDATED_DT = CONVERT(DATETIME, '${date}')
        WHERE ID = ${Number.parseInt(Id)}
	`

    return await handleRunQuery(query, 'AlterUser')

}

const DeleteUser = async (id) => {

    const query = `
        DELETE FROM USERS WHERE ID = ${Number.parseInt(id)}
	`

    return await handleRunQuery(query, 'DeleteUser')

}

const CheckEmailAddress = async (mail) => {

    const query = `
    SELECT US.Id,username, email, password,countryCode,
    phoneNumber, organization, role, US.FK_ROLEID as FkRoleId, US.FK_EMPLOYEEID as FKEmpId,US.IsApproved, 
    US.CREATED_BY,
    US.CREATED_DT,
    US.UPDATED_BY,
    US.UPDATED_DT
    FROM USERS AS US
    INNER JOIN ROLES AS ROLE
    ON US.FK_ROLEID = ROLE.ID
    WHERE EMAIL = '${mail}'
`

    return await handleRunQuery(query, 'CheckEmailAddress')

}

module.exports = {
    GetUser,
    GetUserAndRoles,
    GetUserById,
    GetUserByUsername,
    InsertUserData,
    GetUserRoles,
    UpdateUserById,
    AlterUser,
    DeleteUser,
    UpdateIsApprove,
    CheckEmailAddress,
    UpdateUserPassword,
    GetUserByEmail,
}