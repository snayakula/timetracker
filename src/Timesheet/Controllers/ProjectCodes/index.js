const Project_Codes = require("../../Queries/ProjectCodes");
const Timesheet = require("../../Queries/TimeSheet");
const Allocatedprojects = require("../../Queries/ProjectAllocation");


const GetProjectCodes = async (req, res) => {
  let data = await Project_Codes.GetProjectCodes()
  if (data !== undefined) {
    res.status(200).json({ isSuccess: true, Projects: data.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const GetProjectCode = async (req, res) => {
  let data = await Project_Codes.GetProjectCode()
  if (data !== undefined) {
    res.status(200).json({ isSuccess: true, Projects: data.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const GetTimesheetRecordsOfEmployee = async (req, res) => {

  const { weekid, status, fkempid, year } = req.headers;

  // get all project codes
  let projectCodes = await Project_Codes.GetProjectCodes();

  projectCodes = projectCodes.recordset.filter((item) => {

    const dt = new Date()
    const expiryDate = new Date(item.Expiry_dt)

    return (dt.getTime() < expiryDate.getTime()) && item.projecttype === false
  })

  // get the allocated project codes of employee
  let allocated_project = await Allocatedprojects.GetAllocatedProjectByFKEmployeeId(Number.parseInt(fkempid));

  allocated_project = allocated_project.recordset;

  let timesheet_records = [];

  if (weekid === "null" || weekid === undefined) {
    // load the default projects in

    for (let i = 0; i < projectCodes.length; i++) {
      timesheet_records.push({
        Id: projectCodes[i].ProjectId,
        Work: projectCodes[i].ProjectCode,
        Type: projectCodes[i].Typename,
        ProjectName: projectCodes[i].ProjectName,
        WK_Day1: 0,
        WK_Day2: 0,
        WK_Day3: 0,
        WK_Day4: 0,
        WK_Day5: 0,
        WK_Day6: 0,
        WK_Day7: 0,
      });
    }

    // load the allocated projects in

    for (let j = 0; j < allocated_project.length; j++) {
      timesheet_records.push({
        Id: allocated_project[j].PROJECTCODEID,
        Work: allocated_project[j].PROJECTCODE,
        Type: allocated_project[j].TYPENAME,
        WK_Day1: 0,
        WK_Day2: 0,
        WK_Day3: 0,
        WK_Day4: 0,
        WK_Day5: 0,
        WK_Day6: 0,
        WK_Day7: 0,
        JoiningDate: allocated_project[j].JOININGDATE,
        EndingDate: allocated_project[j].ENDINGDATE,
        ExpiryDate: allocated_project[j].EXPIRYDATE,
        ProjectName: allocated_project[j].PROJECTNAME,
      });
    }
  } else {
    // get the data of the week

    let weekly_timesheet_data = await Timesheet.GetTimesheetWithWeekId(Number.parseInt(weekid), year);

    let data = weekly_timesheet_data.recordset;

    if (status === "Submitted" || status === "Approved") {
      for (let i = 0; i < data.length; i++) {
        timesheet_records.push({
          Id: data[i].ProjectCodeId,
          Work: data[i].ProjectCode,
          Type: data[i].TypeName,
          ProjectName: data[i].ProjectName,
          WK_Day1: data[i].WK_Day1,
          WK_Day2: data[i].WK_Day2,
          WK_Day3: data[i].WK_Day3,
          WK_Day4: data[i].WK_Day4,
          WK_Day5: data[i].WK_Day5,
          WK_Day6: data[i].WK_Day6,
          WK_Day7: data[i].WK_Day7,
        });
      }
    } else if (status === "Rejected" || status === "Pending") {
      // load the default projects and also check for the data

      for (let i = 0; i < projectCodes.length; i++) {
        let timesheet_data = data.filter(
          (item) => item.ProjectCodeId === projectCodes[i].ProjectId
        );

        timesheet_records.push({
          Id: projectCodes[i].ProjectId,
          Work: projectCodes[i].ProjectCode,
          Type: projectCodes[i].Typename,
          ProjectName: projectCodes[i].ProjectName,
          WK_Day1:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day1,
          WK_Day2:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day2,
          WK_Day3:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day3,
          WK_Day4:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day4,
          WK_Day5:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day5,
          WK_Day6:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day6,
          WK_Day7:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day7,
        });
      }

      // load the allocated data

      for (let j = 0; j < allocated_project.length; j++) {
        let timesheet_data = data.filter(
          (item) => item.ProjectCodeId === allocated_project[j].PROJECTCODEID
        );

        timesheet_records.push({
          Id: allocated_project[j].PROJECTCODEID,
          Work: allocated_project[j].PROJECTCODE,
          Type: allocated_project[j].TYPENAME,
          WK_Day1:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day1,
          WK_Day2:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day2,
          WK_Day3:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day3,
          WK_Day4:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day4,
          WK_Day5:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day5,
          WK_Day6:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day6,
          WK_Day7:
            timesheet_data.length === 0 ? 0 : timesheet_data[0].WK_Day7,
          JoiningDate: allocated_project[j].JOININGDATE,
          EndingDate: allocated_project[j].ENDINGDATE,
          ExpiryDate: allocated_project[j].EXPIRYDATE,
          ProjectName: allocated_project[j].PROJECTNAME,
        });
      }
    }
  }

  res.status(200).json({
    isSuccess: true,
    Timesheet: timesheet_records,
    ROLE: allocated_project.length !== 0 ? allocated_project[0].ROLE : "",
  });


}

const GetProjectCodesClients = async (req, res) => {

  let result = await Project_Codes.GetProjectCode();

  result = result.recordset;

  result = result.filter((item, index) => {
    return index === result.findIndex((e) => item.Client === e.Client);
  });

  res.status(200).json({ isSuccess: true, Clients: result });

}

const InsertProjectCodes = async (req, res) => {

  const { ProjectCodes, FKEmpId } = req.body;

  let typeId = await Project_Codes.GetTypes();

  for (let x in ProjectCodes) {
    await Project_Codes.InsertProjectCode(
      ProjectCodes[x][0], // project code
      ProjectCodes[x][1], // project name
      ProjectCodes[x][2], // client
      ProjectCodes[x][3] === '-' ? null : ProjectCodes[x][3], // expiry
      FKEmpId,
      typeId.recordset[0].Id
    );
    await Project_Codes.InsertProjectCode(
      `OT-${ProjectCodes[x][0]}`, // project code
      `Over Time ${ProjectCodes[x][1]}`, // project name
      ProjectCodes[x][2], // client
      ProjectCodes[x][3] === '-' ? null : ProjectCodes[x][3], // expiry
      FKEmpId,
      4
    );
  }

  res.status(200).json({ isSuccess: true });

}

const GetProjectTimesheet = async (req, res) => {

  const { FKEmpId, WeekId } = req.body;

  if (FKEmpId === null || WeekId === null) {
    res.status(200).json({ isSuccess: false });
  }
  else {
    let result = await Project_Codes.GetProjectTimesheet(FKEmpId, WeekId);
    if (result.recordset.length !== 0) {
      res.status(200).json({ isSuccess: true, ProjectTimesheet: result.recordset });
    } else {
      res.status(200).json({ isSuccess: false });
    }
  }

}

const GetAllocatedProjectCodes = async (req, res) => {

  const { Approver } = req.body;

  let result = await Project_Codes.GetAllocatedProjectCodes(Approver);

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, ProjectCodes: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const GetMarkets = async (req, res) => {

  let result = await Project_Codes.GetMarkets();

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, Markets: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const GetIncomeClasses = async (req, res) => {

  let result = await Project_Codes.GetInComeClasses();

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, InComeClasses: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const GetPractices = async (req, res) => {

  let result = await Project_Codes.GetPractices();

  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, Practices: result.recordset });
  } else {
    res.status(200).json({ isSuccess: false });
  }

}

const GenerateProjectCode = async (req, res) => {

  const {
    ClientName,
    ClientCode,
    ProjectName,
    ProjectCode,
    ExpiryDate,
    FKEmpId,
  } = req.body;

  let checkCode = await Project_Codes.CheckProjectCode(ProjectCode);
  if (checkCode.recordset.length === 0) {
    let result = await Project_Codes.GenerateProjectCode(
      ClientName,
      ClientCode,
      ProjectName,
      ProjectCode,
      ExpiryDate,
      FKEmpId,
      1
    );

    await Project_Codes.GenerateProjectCode(
      ClientName,
      ClientCode,
      `Over Time - ${ProjectName}`,
      `OT-${ProjectCode}`,
      ExpiryDate,
      FKEmpId,
      4
    )

    if (result.rowsAffected.length !== 0) {
      let projectCodes = await Project_Codes.GetProjectCodes();

      res.status(200).json({
        isSuccess: true,
        AllocatedProjectCodes: projectCodes.recordset,
        Message: "Project Code is Generated Successfully",
      });
    } else {
      res.status(200).json({
        isSuccess: false,
        Message: "There is some problem please check after sometime",
      });
    }
  } else {
    res.status(200).json({ isSuccess: false, Message: "Project Code already exists" });
  }

}


module.exports = {
  GetProjectCodes,
  GetProjectCode,
  GetTimesheetRecordsOfEmployee,
  GetProjectCodesClients,
  InsertProjectCodes,
  GetProjectTimesheet,
  GetAllocatedProjectCodes,
  GetMarkets,
  GetIncomeClasses,
  GetPractices,
  GenerateProjectCode
}