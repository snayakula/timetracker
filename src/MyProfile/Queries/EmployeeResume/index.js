const { handleRunQuery } = require("../../../../config/db/db");

const GetEmployeeResumeById = async (id) => {

    const query = `
    SELECT *
    FROM EMPLOYEERESUME
    WHERE FK_EmployeeId =  ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'GetEmployeeResumeById')

}

const InsertEmployeeResume = async (filename, id) => {
    const dt = new Date();

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
        INSERT INTO EMPLOYEERESUME(RESUME,FK_EmployeeId,Created_by,Created_dt,Updated_by,Updated_dt)
        VALUES('${filename}',${id === null ? id : Number.parseInt(id)},${id === null ? id : Number.parseInt(id)
        },CONVERT(DATETIME, '${date}'), NULL ,NULL)
	`

    return await handleRunQuery(query, 'InsertEmployeeResume')

}

const UpdateEmployeeResume = async (filename, id) => {
    const dt = new Date();

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const query = `
    UPDATE EMPLOYEERESUME
    SET RESUME = '${filename}',
    UPDATED_BY = ${id === null ? id : Number.parseInt(id)},
    Updated_dt = CONVERT(DATETIME, '${date}')
    WHERE FK_EmployeeId = ${Number.parseInt(id)}
`

    return await handleRunQuery(query, 'UpdateEmployeeResume')

}

const DeleteResumeByFKId = async (fkid) => {

    const query = `
        DELETE FROM EMPLOYEERESUME
        WHERE FK_EmployeeId = ${Number.parseInt(fkid)}
	`

    return await handleRunQuery(query, 'DeleteResumeByFKId')

}

module.exports = {
    GetEmployeeResumeById,
    InsertEmployeeResume,
    UpdateEmployeeResume,
    DeleteResumeByFKId,
};
