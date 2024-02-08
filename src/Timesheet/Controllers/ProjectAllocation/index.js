const ProjectAllocation = require("../../Queries/ProjectAllocation");

const Employees = require("../../../MyProfile/Queries/Employees");
const ProjectCodes = require("../../Queries/ProjectCodes");

const { sendNotification } = require("../../../../config/Mails/MailSender");


const GetAllocatedProjects = async (req, res) => {
  let result = await ProjectAllocation.GetAllocatedProjects()
  if (result.recordset === undefined) {
    res.status(200).json({ isSuccess: false });
  } else {
    res.status(200).json({ isSuccess: true, AllocatedProjects: result.recordset });
  }
}

const GetReportedEmployees = async (req, res) => {
  let result = await ProjectAllocation.GetReportedBy(req.body.FKEmpId)
  res.status(200).json({ isSuccess: true, ReportedBy: result.recordset });
}

const GetAllocatedProjectByFKEmpId = async (req, res) => {
  if (req.body.FKEmpId !== null) {
    let result = await ProjectAllocation.GetAllocatedProjectByFKEmployeeId(
      req.body.FKEmpId
    );

    if (result.recordset === undefined) {
      res.status(200).json({ isSuccess: false });
    } else {
      res.status(200).json({ isSuccess: true, AllocatedProject: result.recordset });
    }
  } else {
    res.status(200).json({ isSuccess: false });
  }
}

const AllocateProject = async (req, res) => {
  const {
    SelectedProject,
    SelectedEmp,
    Role,
    joiningDate,
    Billable,
    BillingRate,
    Location,
    Approver,
    Creator,
    endingDate,
    OverTime } = req.body;

  let allocatedProjects = [];

  // get the total employees
  let employees = await Employees.GetEmployeesOnly();

  // get the project codes
  let projectCodes = await ProjectCodes.GetProjectCodes();

  if (SelectedProject.length > 1) {

    for (let i in SelectedProject) {

      let projectId = handleProjectCodeId(projectCodes.recordset, SelectedProject[i]);

      let employeeId = handleEmployeeId(employees.recordset, SelectedEmp[0]);

      let result = await ProjectAllocation.CheckProjectAllocation(employeeId, projectId);

      if (result.recordset.length !== 0) {
        allocatedProjects.push({
          EmployeeName: SelectedEmp[0],
          ProjectCode: SelectedProject[i],
          isAllocated: true,
        });
      }
      else {
        allocatedProjects.push({
          EmployeeName: SelectedEmp[0],
          ProjectCode: SelectedProject[i],
          isAllocated: false,
        });
        await ProjectAllocation.AllocateProjectToEmployee(
          Role,
          Billable,
          BillingRate,
          Location,
          joiningDate,
          projectId,
          employeeId,
          Approver,
          Creator,
          endingDate,
          true
        );

        // Allocate the Over Time project
        await allocateOverTime(OverTime, Role, Billable, BillingRate, Location, joiningDate,
          projectCodes.recordset, employeeId, Approver, Creator, endingDate, SelectedProject[i])

        sendNotificationToAllocatedEmployee(
          employeeId,
          SelectedEmp[0],
          SelectedProject[i]
        );
      }
    }

  }
  else {
    for (let i in SelectedEmp) {
      let projectId = handleProjectCodeId(
        projectCodes.recordset,
        SelectedProject[0]
      );
      let employeeId = handleEmployeeId(employees.recordset, SelectedEmp[i]);

      let result = await ProjectAllocation.CheckProjectAllocation(
        employeeId,
        projectId
      );

      if (result.recordset.length !== 0) {
        allocatedProjects.push({
          EmployeeName: SelectedEmp[i],
          ProjectCode: SelectedProject[0],
          isAllocated: true,
        });
      } else {
        allocatedProjects.push({
          EmployeeName: SelectedEmp[i],
          ProjectCode: SelectedProject[0],
          isAllocated: false,
        });
        await ProjectAllocation.AllocateProjectToEmployee(
          Role,
          Billable,
          BillingRate,
          Location,
          joiningDate,
          projectId,
          employeeId,
          Approver,
          Creator,
          endingDate,
          true
        );

        await allocateOverTime(OverTime, Role, Billable, BillingRate, Location, joiningDate,
          projectCodes.recordset, employeeId, Approver, Creator, endingDate, SelectedProject[0])

        sendNotificationToAllocatedEmployee(
          employeeId,
          SelectedEmp[i],
          SelectedProject[0]
        );
      }
    }
  }

  res.status(200).json({ isSuccess: true, Allocations: allocatedProjects });


}

const UpdateAllocateProject = async (req, res) => {

  const { joiningDate, endingDate, Approver, Id, FKEmpId, overTimeChecked } = req.body;
  await ProjectAllocation.UpdateAssignProject(
    joiningDate,
    endingDate,
    Approver,
    Id,
    FKEmpId
  );


  let allocated_projects = await ProjectAllocation.GetAllocatedProjects();

  // get the project code first with the Id

  let projectCode = allocated_projects.recordset.filter((item) => item.ID === Id)[0].PROJECTCODE

  // using that check for the over time project code and ge the id with that

  let OverTimeCode = allocated_projects.recordset.filter((item) => item.PROJECTCODE === `OT-${projectCode}`)

  if (OverTimeCode.length !== 0) {

    let OT = 1

    if (overTimeChecked) {
      OT = 1
    }
    else {
      OT = 0
    }

    await ProjectAllocation.UpdateOverTimeCode(
      joiningDate,
      endingDate,
      Approver,
      OverTimeCode[0].ID, FKEmpId, OT)
    allocated_projects = await ProjectAllocation.GetAllocatedProjects();

  }


  res.status(200).json({
    isSuccess: true,
    LatestAllocatedProjects: allocated_projects.recordset,
  });

}



module.exports = {
  GetAllocatedProjects,
  GetReportedEmployees,
  GetAllocatedProjectByFKEmpId,
  AllocateProject,
  UpdateAllocateProject
}





const handleEmployeeId = (list, value) => {
  return list.filter(
    (item) => item.FirstName + " " + item.LastName === value
  )[0].Id;
};

const handleProjectCodeId = (list, value) => {
  return list.filter((item) => item.ProjectCode === value)[0].ProjectId;
};


function sendNotificationToAllocatedEmployee(
  employeeId,
  employeename,
  projectcode
) {
  // get the employee
  const subject = "Project Allocation Notification";

  const message = `
  <!DOCTYPE html>
  <html lang="en">
   
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
   
  <body style="margin: 0;padding: 0;font-family: Arial, Helvetica, sans-serif;">
      <div style="background-image: url('https://media-process.hibob.com/image/upload/q_auto:best,f_auto,a_exif,c_limit,w_3500,h_2500/hibob/image/631227/images/c593074b-76ab-4d8d-906c-d5b2e23cbab3?token=X19jbGRfdG9rZW5fXz1leHA9NDg0NDU5NzkzN35hY2w9KiUyZmhpYm9iJTJmaW1hZ2UlMmY2MzEyMjclMmZpbWFnZXMlMmZjNTkzMDc0Yi03NmFiLTRkOGQtOTA2Yy1kNWIyZTIzY2JhYjMqfmhtYWM9YjQzMjRmNzJiMTY2ZWZhYjFmMjBiODU4ODgxYWM3ZjA2ZTI2MGFjNTNkOTcxMzliZjgxNzQ3OTM4YjY1ZGRiMQ==&vendor=cloudinary');
          height: 100vh;width: 100%;display: grid;place-items: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;">
          <div
              style="width: 400px;background: #fff;padding: 20px;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);">
              <span style="font-size: 16px;font-weight: 600;">Hello ${employeename},</span>
              <p style="font-size: 14px;margin-top: 40px;">you have been allocated to the project with code: ${projectcode}. </p>
              <div style="display: flex;
              justify-content: center;align-items: center;margin-top: 50px;gap: 30px;">
                  <img style="width: 150px;"
                      src="https://www.genzeon.com/wp-content/uploads/2022/03/genzeon-logo-notag-2022.png"
                      alt="genzeon" />
                  <span style="font-size:22px;font-weight: 600;letter-spacing: 2px;">iEmployee</span>
              </div>
          </div>
      </div>
  </body> 
  </html> 
  `;

  Employees.GetEmployeeById(employeeId).then((result) => {
    let Mail = result.recordset[0].Email;

    sendNotification(Mail, employeename, subject, message);
  });
}

async function allocateOverTime(overTimeChecked, Role, Billable, BillingRate, Location, joiningDate,
  projectCodes, employeeId, Approver, Creator, endingDate, code) {

  let ProjectCode = `OT-${code}`
  let OTProjectCodeId = projectCodes.filter(item => item.ProjectCode === ProjectCode)[0].ProjectId
  if (OTProjectCodeId.length !== 0) {
    await ProjectAllocation.AllocateProjectToEmployee(
      Role,
      Billable,
      BillingRate,
      Location,
      joiningDate,
      OTProjectCodeId,
      employeeId,
      Approver,
      Creator,
      endingDate,
      overTimeChecked
    );
  }



}