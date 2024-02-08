const { handleRunQuery } = require('../../../../config/db/db')

const GetProjectCodes = async () => {

    const query = `
    SELECT projects.Id as ProjectId, projects.ProjectCode, projects.projecttype,projects.ProjectName,
    projects.Client,projects.ShortCode,projects.Created_by,projects.Created_dt,projects.Expiry_dt,
    TP.Id as TypeId, TP.Typename
    FROM PROJECTCODES as projects
    INNER JOIN TYPES AS TP
    ON TP.Id = projects.FK_TYPEID
    ORDER BY projects.ProjectCode
`

    return await handleRunQuery(query, 'GetProjectCodes')

}

const GetProjectCode = async () => {

    const query = `
        SELECT *
        FROM PROJECTCODES as projects
        INNER JOIN TYPES AS TP
        ON TP.Id = projects.FK_TYPEID
	`

    return await handleRunQuery(query, 'GetProjectCode')

}

const GetProjectTimesheet = async (id, weekId) => {

    const query = `
    select prc.Id as PROJECTCODEID, prc.ProjectCode,
    tm.WK_Day1,tm.WK_Day2,tm.WK_Day3,tm.WK_Day4,tm.WK_Day5,tm.WK_Day6,tm.WK_Day7
    from projectallocation as pra
    inner join projectcodes as prc
    on pra.FK_PROJECTCODEID = prc.Id
    inner join timesheet as tm
    on tm.FK_PROJECTCODEID = pra.FK_PROJECTCODEID
    inner join employeetimesheet as empt
    on empt.Id = tm.FK_WeekId
    where pra.FK_EMPLOYEEID = ${Number.parseInt(id)} and empt.Id = ${Number.parseInt(weekId)}
`

    return await handleRunQuery(query, 'GetProjectTimesheet')

}

const GetAllocatedProjectCodes = async (Approver) => {

    const query = `
    select distinct pc.ProjectCode
    from projectallocation as pa,
    ProjectCodes as pc
    Where
    pa.FK_EmployeeId in(select DISTINCT FK_EmployeeId from projectallocation where Manager_Approver = ${Approver})
    and pa.Manager_Approver = ${Approver}
    and pa.FK_ProjectCodeId = pc.Id
`

    return await handleRunQuery(query, 'GetAllocatedProjectCodes')


}

const GetTypes = async () => {

    const query = `
    SELECT * FROM Types
    where typename = 'project'
`

    return await handleRunQuery(query, 'GetTypes')

}

const GetProjectCodesById = async (Id) => {

    const query = `
    SELECT * FROM PROJECTCODES
    WHERE ID = ${Number.parseInt(Id)}
`

    return await handleRunQuery(query, 'GetProjectCodesById')

}

const InsertProjectCode = async (code, projectname, client, expiry_date, created_by_id, typeId) => {

    const dt = new Date()
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`
    let expdt = null;
    let expDate = null;
    if (expiry_date !== null) {
        expdt = new Date(expiry_date)
        expDate = `${expdt.getFullYear()}-${expdt.getMonth() + 1}-${expdt.getDate()}`
    }

    const query = `
        INSERT INTO 
        PROJECTCODES(PROJECTCODE,
        CLIENT,
        PROJECTNAME,
        EXPIRY_DT,
        PROJECTTYPE,
        FK_TYPEID,
        CREATED_BY,
        CREATED_DT)
        VALUES('${code}','${client}','${projectname}',
        CONVERT(DATETIME,('${expDate === null ? "9999-12-31" : expDate}')),
        ${1},${Number.parseInt(typeId)},
        ${created_by_id === null ? null : Number.parseInt(created_by_id)},
        CONVERT(DATETIME,('${date}')))
`

    return await handleRunQuery(query, 'InsertProjectCode')

}

const GenerateProjectCode = async (ClientName, ClientCode, ProjectName, ProjectCode, ExpiryDate, FKEmpId, FKType) => {

    const dt = new Date()
    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO PROJECTCODES(PROJECTCODE,
     CLIENT,
     PROJECTNAME,
     EXPIRY_DT,
     PROJECTTYPE,
     FK_TYPEID,
     CREATED_BY,
     CREATED_DT,
     ShortCode)
     VALUES('${ProjectCode}','${ClientName}','${ProjectName}',
     CONVERT(DATETIME,('${ExpiryDate}')),${1},${FKType},
     ${FKEmpId === null ? null : Number.parseInt(FKEmpId)}, CONVERT(DATETIME,('${date}')),'${ClientCode}')
`

    return await handleRunQuery(query, 'GenerateProjectCode')

}

const CheckProjectCode = async (projectCode) => {

    const query = `
   SELECT * 
   FROM ProjectCodes
   Where ProjectCode = '${projectCode}'
`

    return await handleRunQuery(query, 'CheckProjectCode')

}
const GetMarkets = async () => {

    const query = `
   SELECT * 
   FROM MARKETS
`

    return await handleRunQuery(query, 'GetMarkets')

}


const GetInComeClasses = async () => {

    const query = `
    SELECT * 
    FROM InComeClasses
 `

    return await handleRunQuery(query, 'GetInComeClasses')
}
const GetPractices = async () => {

    const query = `
    SELECT * 
    FROM PRACTICEAREAS
 `

    return await handleRunQuery(query, 'GetPractices')
}


module.exports = {
    GetProjectCodes,
    GetTypes,
    GetProjectCodesById,
    InsertProjectCode,
    GetProjectTimesheet,
    GetProjectCode,
    GetAllocatedProjectCodes,
    GetMarkets,
    GetInComeClasses,
    GetPractices,
    GenerateProjectCode,
    CheckProjectCode
}