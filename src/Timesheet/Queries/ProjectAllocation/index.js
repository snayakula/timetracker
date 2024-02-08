const { handleRunQuery } = require('../../../../config/db/db')

const GetAllocatedProjects = async () => {

    const query = `
    SELECT PA.ID,PA.ROLE,PA.BILLABLE,PA.BILLINGRATE,PA.LOCATION,PA.JOINING_DT, PA.ENDING_DT,
    PC.PROJECTCODE, PC.ID AS FK_PROJECTCODEID,PA.OT,
    (EMP.FIRSTNAME + ' ' + EMP.LASTNAME) AS EMPLOYEENAME, EMP.ID AS FK_EMPLOYEEID,
    (APPROVEREMP.FIRSTNAME + ' ' + APPROVEREMP.LASTNAME) AS APPROVER, APPROVEREMP.ID AS MANAGER_APPROVER
    FROM PROJECTALLOCATION AS PA
    INNER JOIN PROJECTCODES AS PC
    ON PA.FK_PROJECTCODEID = PC.ID
    INNER JOIN EMPLOYEES AS EMP
    ON EMP.ID = PA.FK_EMPLOYEEID
    INNER JOIN EMPLOYEES AS APPROVEREMP
    ON APPROVEREMP.ID = PA.MANAGER_APPROVER

`

    return await handleRunQuery(query, 'GetAllocatedProjects')

}

const GetAllocatedEmployees = async () => {

    const query = `
    SELECT emp.Email, pra.joining_dt, prc.expiry_dt, (emp.FirstName + ' ' + emp.LastName) as displayName
    FROM Employees as emp
    INNER JOIN ProjectAllocation as pra
    ON emp.Id = pra.FK_EmployeeId
    inner join projectcodes as prc
    on prc.Id = pra.FK_ProjectCodeId

`

    return await handleRunQuery(query, 'GetAllocatedEmployees')

}

const GetAllocatedProjectByFKEmployeeId = async (FKEmpId) => {

    const query = `
    SELECT PRA.ID AS PROJECTALLOCATIONID, PRA.ROLE, PRA.BILLABLE, PRA.BILLINGRATE, PRA.JOINING_DT AS JOININGDATE, PRA.ENDING_DT as ENDINGDATE,
    PRC.ID AS PROJECTCODEID, PRC.PROJECTCODE,PRC.PROJECTNAME, PRC.EXPIRY_DT AS EXPIRYDATE, TP.TYPENAME,PRA.OT
    FROM PROJECTALLOCATION AS PRA
    INNER JOIN PROJECTCODES AS PRC
    ON PRC.ID = PRA.FK_PROJECTCODEID
    INNER JOIN TYPES AS TP
    ON TP.ID = PRC.FK_TYPEID
    INNER JOIN EMPLOYEES AS APPROVER
    ON APPROVER.ID = PRA.MANAGER_APPROVER
    WHERE PRA.FK_EMPLOYEEID = ${Number.parseInt(FKEmpId)} and OT = 1

`

    return await handleRunQuery(query, 'GetAllocatedProjectByFKEmployeeId')

}

const GetReportedBy = async (FKEmpId) => {

    const query = `
    select DISTINCT FK_EmployeeId as Id, joining_dt as JoiningDate,ending_dt as EndingDate 
    from projectallocation
    where Manager_Approver =${Number.parseInt(FKEmpId)}

	`

    return await handleRunQuery(query, 'GetReportedBy')

}

const GetProjectAllocatedEmployees = async () => {

    const query = `
                
            
        select pra.FK_EmployeeId as Id, pra.joining_dt, prc.Expiry_dt, emp.Email, (emp.FirstName + ' ' + emp.LastName) as displayName
        from projectallocation as pra,
        projectcodes as prc,
        employees as emp
        where prc.Id = pra.FK_ProjectCodeId
        and emp.Id = pra.FK_EmployeeId

	`

    return await handleRunQuery(query, 'GetProjectAllocatedEmployees')

}

const CheckProjectAllocation = async (FKEmpId, projectId) => {

    const query = `
    select * from projectallocation
    where FK_EmployeeId = ${Number.parseInt(FKEmpId)} 
    and FK_Projectcodeid = ${Number.parseInt(projectId)}
`

    return await handleRunQuery(query, 'CheckProjectAllocation')

}

const AllocateProjectToEmployee = async (role, billable, billingRate,
    location, joiningDt, fkProjectCodeId,
    fkEmpId, approver, creator, endingDate, overTimeChecked
) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
        INSERT INTO PROJECTALLOCATION(ROLE,BILLABLE,BILLINGRATE,LOCATION,
        JOINING_DT,ENDING_DT,FK_PROJECTCODEID,
        FK_EMPLOYEEID,MANAGER_APPROVER,CREATED_DT,CREATED_BY,UPDATED_DT,UPDATED_BY,OT)
        VALUES('${role}',${Number.parseInt(billable)},${Number.parseInt(billingRate)},
        ${Number.parseInt(location)},CONVERT(DATETIME,'${joiningDt}'),CONVERT(DATETIME,'${endingDate}'),
        ${Number.parseInt(fkProjectCodeId)},${Number.parseInt(fkEmpId)},${Number.parseInt(approver)},
        CONVERT(DATETIME,'${date}'),${creator === null ? null : Number.parseInt(creator)},
        NULL,NULL,${overTimeChecked === true ? 1 : 0})
	`

    return await handleRunQuery(query, 'AllocateProjectToEmployee')

}

const GetPayCycleAllocation = async () => {

    const query = `
    SELECT Employees.Email, ProjectAllocation.joining_dt,
    ProjectAllocation.ending_dt,
    ProjectCodes.Expiry_dt,
    (Employees.FirstName + ' ' + Employees.LastName) as displayName
    FROM Employees
    inner join  ProjectAllocation
    ON Employees.Id = ProjectAllocation.FK_EmployeeId
    inner join ProjectCodes
    ON ProjectCodes.Id = ProjectAllocation.FK_ProjectCodeId
    where Employees.Location = 1
  `;

    return await handleRunQuery(query, "GetPayCycleAllocation");

}

const GetEmailForApprover = async (FKEmpId, WeekId) => {

    const query = `       
        select emp.Email, 
        pra.Joining_dt, 
        pra.Ending_dt, 
        prc.Expiry_dt, 
        (emp.FirstName + ' ' + emp.LastName) as Approver,
        (empdata.FirstName + ' ' + empdata.LastName) as EmployeeName
        from employeetimesheet as empt,
        projectallocation as pra,
        employees as emp,
        projectcodes as prc,
        employees as empdata
        where weekNumber = ${Number.parseInt(WeekId)}
        and empt.FK_EmployeeId = ${Number.parseInt(FKEmpId)}
        and pra.FK_EmployeeId = ${Number.parseInt(FKEmpId)}
        and emp.Id = pra.Manager_Approver
        and prc.Id = pra.FK_ProjectCodeId
        and empdata.Id = ${Number.parseInt(FKEmpId)}
  `

    return await handleRunQuery(query, "GetPayCycleAllocation")

}

const UpdateAssignProject = async (joiningDate, endingDate, Approver, Id, FKEmpId) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `  
    UPDATE ProjectAllocation
    SET Manager_Approver = ${Number.parseInt(Approver)},  
    joining_dt = CONVERT(DATETIME,'${joiningDate}'),
    ending_dt = CONVERT(DATETIME,'${endingDate}'),
    Updated_by = ${FKEmpId === null ? null : Number.parseInt(FKEmpId)},
    Updated_dt = '${date}'
    WHERE Id = ${Number.parseInt(Id)}`

    return await handleRunQuery(query, 'UpdateAssignProject')
}
const UpdateOverTimeCode = async (joiningDate, endingDate, Approver, Id, FKEmpId, OT) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = ` 
    UPDATE ProjectAllocation
    SET OT = ${OT},
    joining_dt = CONVERT(DATETIME,'${joiningDate}'),
    ending_dt = CONVERT(DATETIME,'${endingDate}'),
    Manager_Approver = ${Number.parseInt(Approver)},
    Updated_by = ${FKEmpId === null ? null : Number.parseInt(FKEmpId)},
    Updated_dt = '${date}'
    WHERE Id = ${Number.parseInt(Id)}`

    return await handleRunQuery(query, 'UpdateAssignProject')
}


module.exports = {
    GetAllocatedProjects,
    GetAllocatedProjectByFKEmployeeId,
    AllocateProjectToEmployee,
    GetReportedBy,
    CheckProjectAllocation,
    GetProjectAllocatedEmployees,
    GetAllocatedEmployees,
    GetPayCycleAllocation,
    GetEmailForApprover,
    UpdateAssignProject,
    UpdateOverTimeCode
}