const { handleRunQuery } = require('../../../../config/db/db')

const GetTimesheetWithWeekId = async (weekId, Year) => {

    const query = `
    SELECT ts.Id, ts.WK_Day1, ts.WK_Day2, ts.WK_Day3, ts.WK_Day4,
    ts.WK_Day5,ts.WK_Day6,ts.WK_Day7,ts.Created_by,ts.Created_dt,ts.Updated_by,ts.Updated_dt,
    projects.Id as ProjectCodeId, projects.ProjectCode, tp.typename as TypeName, projects.ProjectName
    FROM EMPLOYEETIMESHEET AS EMPT
    INNER JOIN TIMESHEET AS ts
    ON ts.FK_WEEKID = EMPT.ID
    INNER JOIN ProjectCodes AS PROJECTS
    ON PROJECTS.ID = ts.FK_ProjectCodeId
    INNER JOIN TYPES AS TP
    ON TP.ID = PROJECTS.FK_TypeId
    WHERE EMPT.ID = ${weekId} AND YEAR = ${Number.parseInt(Year)}
	`

    return await handleRunQuery(query, 'GetTimesheetWithWeekId')

}
const GetLatestTimesheet = async () => {

    const query = `
    select * IDENT_CURRENT('Timesheet)
`

    return await handleRunQuery(query, 'GetLatestTimesheet')

}

const InsertTimesheet = async (wkDay1, wkDay2, wkDay3, wkDay4, wkDay5, wkDay6, wkDay7, FKPROJECTCODE, FKweekId, FKEmpId) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    INSERT INTO
    TIMESHEET(WK_DAY1,WK_DAY2,WK_DAY3,WK_DAY4,WK_DAY5,WK_DAY6,WK_DAY7,FK_PROJECTCODEID,FK_WEEKID,CREATED_BY,CREATED_DT,UPDATED_BY,UPDATED_DT)
    VALUES(${Number.parseFloat(wkDay1)},${Number.parseFloat(wkDay2)},${Number.parseFloat(wkDay3)},${Number.parseFloat(wkDay4)},
    ${Number.parseFloat(wkDay5)},${Number.parseFloat(wkDay6)},${Number.parseFloat(wkDay7)},${Number.parseInt(FKPROJECTCODE)},
    ${Number.parseInt(FKweekId)},${Number.parseInt(FKEmpId)},'${date}',NULL,NULL)
`

    return await handleRunQuery(query, 'InsertTimesheet')

}

const DeleteTimesheetByWeekId = async (WeekId) => {

    const query = `
    delete from Timesheet
    where FK_WeekId = ${Number.parseInt(WeekId)}
`

    return await handleRunQuery(query, 'DeleteTimesheetByWeekId')

}

const GetTimesheetDetailsProjectCodes = async (FKEmpId, WeekNumber, Year) => {
    const query = `
    SELECT TM.Id,WK_Day1,WK_Day2,WK_Day3,WK_Day4,WK_Day5,WK_Day6,WK_Day7,
    PRC.ProjectCode, PRC.ProjectName, PRC.Expiry_DT,PRA.ENDING_DT,PRA.JOINING_DT, TP.TYPENAME,
    PRA.ROLE
    FROM TIMESHEET AS TM
    INNER JOIN PROJECTCODES AS PRC
    ON TM.FK_PROJECTCODEID = PRC.ID
    INNER JOIN PROJECTALLOCATION AS PRA
    ON PRA.FK_PROJECTCODEID = PRC.ID
    INNER JOIN TYPES AS TP
    ON TP.ID = PRC.FK_TYPEID
    WHERE TM.FK_WEEKID IN(
    SELECT ID FROM EMPLOYEETIMESHEET
    WHERE FK_EMPLOYEEID = ${Number.parseInt(FKEmpId)} AND WEEKNUMBER = ${Number.parseInt(WeekNumber)} AND YEAR = ${Number.parseInt(Year)})
    AND PRC.FK_TYPEID IN(1)
    GROUP BY
    TM.Id,WK_Day1,WK_Day2,WK_Day3,WK_Day4,WK_Day5,WK_Day6,WK_Day7,
    PRC.ProjectCode, PRC.ProjectName, PRC.Expiry_DT,PRA.ENDING_DT,PRA.JOINING_DT, TP.TYPENAME,PRA.ROLE
    `
    return await handleRunQuery(query, 'GetProjectCodeTimesheetQuery')
}


const GetTimesheetDetailsDefaultCodes = async (FKEmpId, WeekNumber, Year) => {
    const query = `
    SELECT TM.Id,WK_Day1,WK_Day2,WK_Day3,WK_Day4,WK_Day5,WK_Day6,WK_Day7,
    PRC.ProjectCode, PRC.ProjectName, TP.TYPENAME
    FROM TIMESHEET AS TM
    INNER JOIN PROJECTCODES AS PRC
    ON TM.FK_PROJECTCODEID = PRC.ID
    INNER JOIN TYPES as TP
    ON TP.ID = PRC.FK_TYPEID
    WHERE TM.FK_WEEKID IN(
    SELECT ID FROM EMPLOYEETIMESHEET
    WHERE FK_EMPLOYEEID = ${Number.parseInt(FKEmpId)} AND WEEKNUMBER = ${Number.parseInt(WeekNumber)} AND YEAR = ${Number.parseInt(Year)})
    AND PRC.FK_TYPEID IN(2,3,4)
    GROUP BY
    TM.Id,WK_Day1,WK_Day2,WK_Day3,WK_Day4,WK_Day5,WK_Day6,WK_Day7,
    PRC.ProjectCode, PRC.ProjectName,TP.TYPENAME
    `

    return await handleRunQuery(query, 'GetDefaultProjectCodeTimesheet')
}

module.exports = {
    GetTimesheetWithWeekId,
    GetLatestTimesheet,
    InsertTimesheet,
    DeleteTimesheetByWeekId,
    GetTimesheetDetailsProjectCodes,
    GetTimesheetDetailsDefaultCodes
}