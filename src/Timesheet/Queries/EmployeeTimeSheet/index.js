const { handleRunQuery } = require('../../../../config/db/db')

const GetEmployeeTimesheet = async (fkid, year) => {

    const query = `
    select empt.Id, empt.WeekNumber, empt.Month,empt.Year,empt.JobTitle,
	empt.Status, empt.TotalHours, empt.SubmittedDate, empt.Comment, empt.Created_by,
	empt.Created_dt, empt.Updated_by, empt.Updated_dt, emp.ReportingTo as Approver
	from employeetimesheet empt
	inner join employees as emp
	on emp.Id = empt.FK_EmployeeId
    where empt.FK_EmployeeId = ${Number.parseInt(fkid)} and empt.Year = ${Number.parseInt(year)}
    `

    return await handleRunQuery(query, 'GetEmployeeTimesheet')

}

const GetAllTimesheetReports = async () => {

    // select empt.Id, empt.WeekNumber, empt.Month,
    // empt.Year,empt.JobTitle,empt.Status,
    // SUM(tm.WK_Day1 + tm.WK_Day2 + tm.WK_Day3 + tm.WK_Day4 + tm.WK_Day5 + tm.WK_Day6 + tm.WK_Day7) as ProjectTotal,
    // empt.TotalHours,
    // empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver,
    // (emp.FirstName + ' '+ emp.LastName) as Name,pc.ProjectCode,
    // pc.ProjectName as ProjectName,
    // emp.Id as FKEmpId
    // from employeetimesheet as empt,
    // employees as emp,
    // employees as emp_apr,
    // ProjectAllocation as pa,
    // ProjectCodes as pc,
    // timesheet as tm
    // Where
    // emp.Id = empt.FK_EMPLOYEEID 
    // and emp.Id = pa.FK_EmployeeId
    // and pa.Manager_Approver = emp_apr.Id
    // and empt.Status in('Submitted','Approved','Rejected')
    // and pa.FK_ProjectCodeId = pc.Id
    // and tm.FK_WeekId = empt.Id
    // and tm.FK_ProjectCodeId = pc.Id
    // and pc.FK_TypeId = 1
    // group by pc.ProjectCode,pc.ProjectName, empt.Id, empt.WeekNumber, empt.Month,
    // empt.Year,empt.JobTitle,empt.Status,empt.TotalHours,
    // empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName),
    // (emp.FirstName + ' '+ emp.LastName), emp.Id
    // order by empt.SubmittedDate
    const query = `
    SELECT
    empt.Id,
    empt.WeekNumber,
    empt.Month,
    empt.Year,
    empt.JobTitle,
    empt.Status,
    SUM(tm.WK_Day1 + tm.WK_Day2 + tm.WK_Day3 + tm.WK_Day4 + tm.WK_Day5 + tm.WK_Day6 + tm.WK_Day7) as ProjectTotal,
    empt.TotalHours,
    empt.SubmittedDate,
    empt.Comment,
    (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver,
    (emp.FirstName + ' ' + emp.LastName) as Name,
    pc.ProjectCode, pc.ProjectName,
    emp.Id as FKEmpId
FROM EmployeeTimesheet as empt
INNER JOIN Timesheet as tm ON tm.FK_WeekId = empt.Id
INNER JOIN Employees as emp ON emp.Id = empt.FK_EmployeeId
INNER JOIN Employees as emp_apr ON emp.ReportingTo = emp_apr.Id
INNER JOIN ProjectCodes as pc ON pc.Id = tm.FK_ProjectCodeId
WHERE 
    empt.Status IN ('Submitted','Approved','Rejected')
    AND pc.FK_TypeId in(1,2,3)
GROUP BY
    pc.ProjectCode,
    empt.Id,
    empt.WeekNumber,
    empt.Month,
    empt.Year,
    empt.JobTitle,
    empt.Status,
    empt.TotalHours,
    empt.SubmittedDate,
    empt.Comment,
    pc.ProjectName,
    (emp_apr.FirstName + ' ' + emp_apr.LastName),
    (emp.FirstName + ' ' + emp.LastName),
    emp.Id
ORDER BY empt.SubmittedDate;
    `

    return await handleRunQuery(query, 'GetAllTimesheetReports')

}

const CheckDefaulters = async (weekNumber, FKId) => {

    const query = `
        select empt.WeekNumber, empt.Status
        from employeetimesheet as empt
        where WeekNumber = ${Number.parseInt(weekNumber)}
        and FK_EmployeeId = ${Number.parseInt(FKId)}
        `

    return await handleRunQuery(query, 'CheckDefaulters')

}

const CheckWeekStatus = async (WeekId, FKEmpId) => {

    const query = `
    select Status from  EmployeeTimesheet  
    where Id =${Number.parseInt(WeekId)} and Fk_EmployeeId =${Number.parseInt(FKEmpId)}
        `

    return await handleRunQuery(query, 'CheckWeekStatus')

}

const GetEmployeeTimesheetByYearAndFKEmployeeId = async (Approver) => {

    const query = `
    select empt.Id, empt.WeekNumber, empt.Month,
    empt.Year,empt.JobTitle,empt.Status
    ,SUM(tm.WK_Day1 + tm.WK_Day2 + tm.WK_Day3 + tm.WK_Day4 + tm.WK_Day5 + tm.WK_Day6 + tm.WK_Day7) as ProjectTotal
    ,empt.TotalHours,
    empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver ,
    (emp.FirstName + ' '+ emp.LastName) as Name,pc.ProjectCode, pc.ProjectName,
    emp.Id as FKEmpId
    from employeetimesheet as empt,
    employees as emp,
    employees as emp_apr,
    ProjectAllocation as pa,
    ProjectCodes as pc,
    timesheet as tm
    Where
    emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = pa.FK_EmployeeId
    and pa.Manager_Approver = emp_apr.id
    and empt.FK_EmployeeId in(select DISTINCT FK_EmployeeId from projectallocation where Manager_Approver = ${Approver})
    and pa.Manager_Approver = ${Approver}
    and empt.Status in('Submitted','Approved','Rejected')
    and pa.FK_ProjectCodeId = pc.Id
    and tm.FK_WeekId = empt.Id
    and tm.FK_ProjectCodeId = pc.Id
    and pc.FK_TypeId = 1
    group by pc.ProjectCode, pc.ProjectName, empt.Id, empt.WeekNumber, empt.Month,
    empt.Year,empt.JobTitle,empt.Status,empt.TotalHours,
    empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName),
    (emp.FirstName + ' '+ emp.LastName), emp.Id
    order by empt.SubmittedDate
    
    `

    return await handleRunQuery(query, 'GetEmployeeTimesheetByYearAndFKEmployeeId')

}

const GetEmployeeTimesheetByReportingManager = async (Approver) => {

    const query = `
    SELECT
    empt.Id,
    empt.WeekNumber,
    empt.Month,
    empt.Year,
    empt.JobTitle,
    empt.Status,
    SUM(tm.WK_Day1 + tm.WK_Day2 + tm.WK_Day3 + tm.WK_Day4 + tm.WK_Day5 + tm.WK_Day6 + tm.WK_Day7) as ProjectTotal,
    empt.TotalHours,
    empt.SubmittedDate,
    empt.Comment,
    (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver,
    (emp.FirstName + ' ' + emp.LastName) as Name,
    pc.ProjectCode, pc.ProjectName,
    emp.Id as FKEmpId
FROM EmployeeTimesheet as empt
INNER JOIN Timesheet as tm ON tm.FK_WeekId = empt.Id
INNER JOIN Employees as emp ON emp.Id = empt.FK_EmployeeId
INNER JOIN Employees as emp_apr ON emp.ReportingTo = emp_apr.Id
INNER JOIN ProjectCodes as pc ON pc.Id = tm.FK_ProjectCodeId
WHERE empt.FK_EmployeeId IN (SELECT Id FROM Employees WHERE ReportingTo = ${Approver})
    AND empt.Status IN ('Submitted','Approved','Rejected')
    AND pc.FK_TypeId in(1,2,3)
    and emp_apr.Id = ${Approver}
GROUP BY
    pc.ProjectCode,
    empt.Id,
    empt.WeekNumber,
    empt.Month,
    empt.Year,
    empt.JobTitle,
    empt.Status,
    empt.TotalHours,
    empt.SubmittedDate,
    empt.Comment,
    pc.ProjectName,
    (emp_apr.FirstName + ' ' + emp_apr.LastName),
    (emp.FirstName + ' ' + emp.LastName),
    emp.Id
ORDER BY empt.SubmittedDate;

    `

    return await handleRunQuery(query, 'GetEmployeeTimesheetByReportingManager')

}

const GetLatestIdForEmployeeTimesheet = async () => {

    const query = `
    select IDENT_CURRENT('EmployeeTimeSheet')
    `

    return await handleRunQuery(query, 'GetLatestIdForEmployeeTimesheet')

}

const InsertEmployeeTimesheet = async (weekNumber, month, year, jobTitle, status, totalHours, FKEmpId, comment) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
            INSERT INTO
            EMPLOYEETIMESHEET(WEEKNUMBER, MONTH, YEAR, JOBTITLE,STATUS,TOTALHOURS, SUBMITTEDDATE, FK_EMPLOYEEID, COMMENT, CREATED_BY,CREATED_DT,UPDATED_BY,UPDATED_DT)
            VALUES('${weekNumber}',${Number.parseInt(month)}, ${Number.parseInt(year)},'${jobTitle}','${status}',${Number.parseFloat(totalHours)},'${date}',
            ${Number.parseInt(FKEmpId)},'${comment}',${Number.parseInt(FKEmpId)},'${date}',NULL,NULL)
        `

    return await handleRunQuery(query, 'InsertEmployeeTimesheet')

}

const UpdateEmployeeTimesheet = async (weekId, totalHours, comment, status, FKEmpId) => {
    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    /*
    
    UPDATE EMPLOYEETIMESHEET
            SET TOTALHOURS = ${Number.parseFloat(totalHours)}, COMMENT = '${comment}',
            UPDATED_BY = ${FKEmpId === null ? null : Number.parseInt(FKEmpId)}, UPDATED_DT = '${date}',
            SUBMITTEDDATE = '${date}', STATUS = '${status}'
            WHERE Id = ${Number.parseInt(weekId)}

    */

    const query = `
            UPDATE EMPLOYEETIMESHEET
            SET TOTALHOURS = ${Number.parseFloat(totalHours)}, COMMENT = '${comment}',
            SUBMITTEDDATE = '${date}', STATUS = '${status}'
            WHERE Id = ${Number.parseInt(weekId)}
        `

    return await handleRunQuery(query, 'UpdateEmployeeTimesheet')

}

const ApproveAndRejectTimesheet = async (weekId, comment, status, FKEmpId) => {
    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    UPDATE EMPLOYEETIMESHEET
    SET COMMENT = '${comment}',
    UPDATED_BY = ${FKEmpId === null ? null : Number.parseInt(FKEmpId)}, UPDATED_DT = '${date}',
    STATUS = '${status}'
    WHERE Id = ${Number.parseInt(weekId)}
`

    return await handleRunQuery(query, 'ApproveAndRejectTimesheet')

}

const GetEmployeeTimesheetTimeline = async (FKEmpId, min, max, Approver) => {

    const query = `
    select empt.Id, empt.WeekNumber, empt.Month,
    empt.Year,empt.JobTitle,empt.Status,empt.TotalHours,
    empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver ,
    (emp.FirstName + ' '+ emp.LastName) as Name, pc.ProjectCode
    from employeetimesheet as empt,
    employees as emp,
    employees as emp_apr,
    ProjectAllocation as pa,
    ProjectCodes as pc
    Where
    emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = pa.FK_EmployeeId
    and pa.Manager_Approver = emp_apr.id
    and empt.FK_EmployeeId = ${Number.parseInt(FKEmpId)}
    and pa.Manager_Approver = ${Number.parseInt(Approver)}
    and empt.Status in('Approved','Rejected')
    and (Year between ${Number.parseInt(min)} and ${Number.parseInt(max)})
    and pa.FK_ProjectCodeId = pc.Id
    order by empt.SubmittedDate
    `

    return await handleRunQuery(query, 'GetEmployeeTimesheetTimeline')

}

const GetEmployeeTimesheetReports = async (FKEmpId, Approver) => {

    const query = `
    select empt.Id, empt.WeekNumber, empt.Month,
    empt.Year,empt.JobTitle,empt.Status,empt.TotalHours,
    empt.SubmittedDate, empt.Comment, (emp_apr.FirstName + ' ' + emp_apr.LastName) as Approver ,
    (emp.FirstName + ' '+ emp.LastName) as Name, pc.ProjectCode
    from employeetimesheet as empt,
    employees as emp,
    employees as emp_apr,
    ProjectAllocation as pa,
    ProjectCodes as pc
    Where
    emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = empt.FK_EMPLOYEEID 
    and emp.Id = pa.FK_EmployeeId
    and pa.Manager_Approver = emp_apr.id
    and empt.FK_EmployeeId = ${Number.parseInt(FKEmpId)}
    and pa.Manager_Approver = ${Number.parseInt(Approver)}
    and empt.Status in('Approved','Rejected')
    and pa.FK_ProjectCodeId = pc.Id
    order by empt.SubmittedDate
    `

    return await handleRunQuery(query, 'GetEmployeeTimesheetReports')

}

const GetRegularHours = async (FKEmpId) => {

    const query = `
    select empt.Id as WeekId, 
    (tm.WK_Day1+tm.WK_Day2+tm.WK_Day3+tm.WK_Day4+tm.WK_Day5+tm.WK_Day6+tm.WK_Day7) as TotalRegularHours
    from EmployeeTimeSheet as empt,
    Timesheet as tm,
    ProjectCodes as pc
    where tm.FK_WeekId = empt.Id
    and empt.FK_EmployeeId in(select DISTINCT FK_EmployeeId from projectallocation where Manager_Approver = ${Number.parseInt(FKEmpId)})
    and pc.Id = tm.FK_ProjectCodeId
    and pc.ProjectCode = 'In-House Project'
    
    `

    return await handleRunQuery(query, 'GetRegularHours')

}

const GetOverTimeHours = async () => {

    // select empt.Id as WeekId, 
    // (tm.WK_Day1+tm.WK_Day2+tm.WK_Day3+tm.WK_Day4+tm.WK_Day5+tm.WK_Day6+tm.WK_Day7) as TotalOverTimeHours
    // from EmployeeTimeSheet as empt,
    // Timesheet as tm,
    // ProjectCodes as pc
    // where tm.FK_WeekId = empt.Id
    // and empt.FK_EmployeeId in(select DISTINCT FK_EmployeeId from projectallocation where Manager_Approver =  ${Number.parseInt(FKEmpId)})
    // and pc.Id = tm.FK_ProjectCodeId
    // and pc.ProjectCode = 'Over Time'
    const query = `
    select empt.Id,prc.ProjectCode, (WK_Day1+WK_Day2+WK_Day3+WK_Day4+WK_Day5+WK_Day6+WK_Day7) as TotalHours,
    pra.FK_EmployeeId
    from projectallocation as pra,
    projectcodes as prc,
    timesheet as tm,
    employeetimesheet as empt
    where prc.Id = pra.FK_ProjectCodeId
    and tm.FK_ProjectCodeId = prc.Id
    and prc.FK_TypeId = 4
    and empt.Id = tm.FK_WeekId
    order by empt.SubmittedDate
        `

    return await handleRunQuery(query, 'GetOverTimeHours')

}

const GetEmailforApprovedId = async (Ids) => {

    const query = `
    select DISTINCT empt.WeekNumber as weekNumber, emp.Email, 
    ( emp.FirstName + ' ' + emp.LastName ) as EmployeeName,
    ( approveremp.FirstName + ' ' + approveremp.LastName ) as ApproverName, empt.Year
    from EmployeeTimeSheet as empt,
    employees as emp,
    employees as approveremp
    where empt.Id in(${Ids})
    and emp.Id = empt.FK_EmployeeId
    and approveremp.Id = empt.Updated_by

        `

    return await handleRunQuery(query, 'GetEmailforApprovedId')

}

const GetTotalWorkingEmployeeTimesheetReports = async (fkid, year, month) => {
    const query = `
        SELECT
        SUM(WK_Day1+WK_Day2+WK_Day3+WK_Day4+WK_Day5+WK_Day6+WK_Day7) as MonthlyHours,PRA.ROLE as jobTitle,
        PRC.CLIENT,
        PRC.ProjectCode,
        (EMP.FirstName+' '+EMP.LastName) AS EmployeeName,
        Emp.Location,
        (APR_EMP.FirstName+' '+APR_EMP.LastName) AS ManagerName
        FROM TIMESHEET AS TM,
        PROJECTCODES AS PRC,
        PROJECTALLOCATION AS PRA,
        EMPLOYEES AS EMP,
        EMPLOYEES AS APR_EMP
        WHERE TM.FK_WEEKID IN(SELECT ID
        FROM EmployeeTimeSheet AS EMPT
        WHERE FK_EMPLOYEEID =  ${Number.parseInt(fkid)}
        AND MONTH = ${Number.parseInt(month)}
        AND YEAR = ${Number.parseInt(year)}
        AND Status in('Approved'))
        AND PRC.FK_TYPEID = 1
        AND PRA.FK_PROJECTCODEID = PRC.ID
        AND PRC.ID = TM.FK_PROJECTCODEID
        AND PRA.FK_EMPLOYEEID =${Number.parseInt(fkid)}
        AND EMP.ID = ${Number.parseInt(fkid)}
        AND APR_EMP.ID = EMP.REPORTINGTO
        GROUP BY
        PRA.ROLE,PRC.CLIENT,PRC.ProjectCode,
        (EMP.FirstName+' '+EMP.LastName),Emp.Location,(APR_EMP.FirstName+' '+APR_EMP.LastName)
 
    `
    return await handleRunQuery(query, 'GetTotalWorkingEmployeeTimesheetReports')

}

const GetMonthlyReportForGenericCodes = async (fkid, year, month) => {
    const query = `
    SELECT
    SUM(WK_Day1+WK_Day2+WK_Day3+WK_Day4+WK_Day5+WK_Day6+WK_Day7) as MonthlyHours,
    PRC.CLIENT,
    PRC.ProjectCode,
    (EMP.FirstName+' '+EMP.LastName) AS EmployeeName,
    Emp.Location,
    (APR_EMP.FirstName+' '+APR_EMP.LastName) AS ManagerName
    FROM TIMESHEET AS TM,
    PROJECTCODES AS PRC,
    EMPLOYEES AS EMP,
    EMPLOYEES AS APR_EMP
    WHERE TM.FK_WEEKID IN(SELECT ID
    FROM EmployeeTimeSheet AS EMPT
    WHERE FK_EMPLOYEEID = ${Number.parseInt(fkid)}
    AND MONTH = ${Number.parseInt(month)}
    AND YEAR = ${Number.parseInt(year)}
    AND Status in('Approved','Submitted','Rejected'))
    AND PRC.FK_TYPEID in(2,3)
    AND PRC.ID = TM.FK_PROJECTCODEID
    AND EMP.ID = ${Number.parseInt(fkid)}
    AND APR_EMP.ID = EMP.REPORTINGTO
    GROUP BY
    PRC.CLIENT,PRC.ProjectCode,
    (EMP.FirstName+' '+EMP.LastName),Emp.Location,(APR_EMP.FirstName+' '+APR_EMP.LastName)
 
    `
    return await handleRunQuery(query, 'GetMonthlyReportForGenericCodes')

}

module.exports = {
    GetEmployeeTimesheet,
    GetEmployeeTimesheetByYearAndFKEmployeeId,
    GetLatestIdForEmployeeTimesheet,
    InsertEmployeeTimesheet,
    UpdateEmployeeTimesheet,
    ApproveAndRejectTimesheet,
    GetEmployeeTimesheetTimeline,
    GetEmployeeTimesheetReports,
    GetRegularHours,
    GetOverTimeHours,
    CheckDefaulters,
    GetEmailforApprovedId,
    CheckWeekStatus,
    GetEmployeeTimesheetByReportingManager,
    GetAllTimesheetReports,
    GetTotalWorkingEmployeeTimesheetReports,
    GetMonthlyReportForGenericCodes
}