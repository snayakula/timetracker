const moment = require("moment");
const { eachDayOfInterval, isWeekend } = require('date-fns')

const EmployeeTimesheet = require("../../Queries/EmployeeTimeSheet");
const {
  sendNotification,
  sendTimesheetReport,
} = require("../../../../config/Mails/MailSender");
const Employees = require("../../../MyProfile/Queries/Employees");
const { GetHolidaysByYearANDMONTH } = require("../../Queries/Holidays");
const { GetReportedBy } = require("../../Queries/ProjectAllocation");


const GetWeeklyTimesheetByFKId = async (req, res) => {
  const { FKId, Year, NumberOfWeeks } = req.body;
  if (FKId === null) {
    res.status(200).json({ isSuccess: false });
  } else {
    let data = await EmployeeTimesheet.GetEmployeeTimesheet(FKId, Year);

    let result = await handleTimesheet(NumberOfWeeks, data.recordset, Year);

    if (data === undefined) {
      res.status(200).json({ isSuccess: false });
    } else {
      res.status(200).send({ isSuccess: true, EmployeeTimesheet: result });
    }
  }
}

const GetWeeklyTimesheetData = async (req, res) => {

  let result = [];

  let data = await EmployeeTimesheet.GetEmployeeTimesheetByYearAndFKEmployeeId(req.body.Approver);

  let data1 = await EmployeeTimesheet.GetEmployeeTimesheetByReportingManager(req.body.Approver);

  let output = [...data.recordset, ...data1.recordset];

  output = output.filter((item, index) => {
    return (
      index ===
      output.findIndex(
        (e) => item.Id === e.Id && item.ProjectCode === e.ProjectCode
      )
    );
  });

  let OverTimeHours = await EmployeeTimesheet.GetOverTimeHours();

  OverTimeHours = OverTimeHours.recordset;

  for (let i in output) {

    let OverTime = OverTimeHours.filter(item => item.Id = output[i].Id && item.ProjectCode === `OT-${output[i].ProjectCode}` && item.FK_EmployeeId === output[i].FKEmpId)

    result.push({
      ...output[i],
      OverTime: OverTime.length !== 0 ? OverTime[0].TotalHours : 0,
      check: false,
    });
  }

  if (result.length === 0) {
    res.status(200).json({ isSuccess: false });
  } else {
    res.status(200).json({ isSuccess: true, timesheet: result });
  }
}

const CheckStatus = async (req, res) => {
  const { WeekId, FKEmpId } = req.body;

  let result = await EmployeeTimesheet.CheckWeekStatus(WeekId, FKEmpId);
  if (result.recordset.length !== 0) {
    res.status(200).json({ isSuccess: true, Status: result.recordset[0].Status });
  }
}

const ApproveTimesheet = async (req, res) => {
  const { AllWeekIds, FKEmpId, Comment } = req.body;
  for (let x in AllWeekIds) {
    await EmployeeTimesheet.ApproveAndRejectTimesheet(
      AllWeekIds[x],
      Comment,
      "Approved",
      FKEmpId
    );
  }

  const Subject = "Timesheet Approved";

  if (AllWeekIds.length === 1) {
    const emailIds = await EmployeeTimesheet.GetEmailforApprovedId(
      AllWeekIds[0]
    );

    const Message = `
          
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
                <span style="font-size: 16px;font-weight: 600;">Hello ${handleFullname(emailIds.recordset[0].EmployeeName)},</span>
                <p style="font-size: 14px;margin-top: 40px;">Your Timesheet of Weekending ${handleWeekEndingdate(emailIds.recordset[0].weekNumber, emailIds.recordset[0].Year)} is Approved by
                    <b>${handleFullname(emailIds.recordset[0].ApproverName)}</b>.
                </p>
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
    sendNotification(
      emailIds.recordset[0].Email,
      emailIds.recordset[0].EmployeeName,
      Subject,
      Message
    );
  }
  else {
    const Ids = AllWeekIds.join(",");

    const emailIds = await EmployeeTimesheet.GetEmailforApprovedId(Ids);

    emailIds.recordset.forEach((item) => {
      const Message = `

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
                  <span style="font-size: 16px;font-weight: 600;">Hello ${handleFullname(item.EmployeeName)},</span>
                  <p style="font-size: 14px;margin-top: 40px;">Your Timesheet of Weekending ${handleWeekEndingdate(item.weekNumber, item.Year)} is Approved by
                      <b>${handleFullname(item.ApproverName)}</b>.
                  </p>
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

      sendNotification(item.Email, item.EmployeeName, Subject, Message);
    });
  }

  res.status(200).json({ isSuccess: true });
}

const RejectTimesheet = async (req, res) => {
  const { AllWeekIds, FKEmpId, Comment } = req.body;
  for (let x in AllWeekIds) {
    await EmployeeTimesheet.ApproveAndRejectTimesheet(
      AllWeekIds[x],
      Comment,
      "Rejected",
      FKEmpId
    );
  }

  const Subject = "Timesheet Rejected";

  if (AllWeekIds.length === 1) {
    const emailIds = await EmployeeTimesheet.GetEmailforApprovedId(
      AllWeekIds[0]
    );

    const Message = `
          
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
                <span style="font-size: 16px;font-weight: 600;">Hello ${handleFullname(emailIds.recordset[0].EmployeeName)},</span>
                <p style="font-size: 14px;margin-top: 40px;">Your Timesheet of Weekending ${handleWeekEndingdate(emailIds.recordset[0].weekNumber, emailIds.recordset[0].Year)} is Rejected by
                    <b>${handleFullname(emailIds.recordset[0].ApproverName)}</b>.
                    <p><b>Reason:</b>${Comment}</p>
                </p>
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

    sendNotification(
      emailIds.recordset[0].Email,
      emailIds.recordset[0].Name,
      Subject,
      Message
    );
  }
  else {
    const Ids = AllWeekIds.join(",");

    const emailIds = await EmployeeTimesheet.GetEmailforApprovedId(Ids);

    emailIds.recordset.forEach((item) => {
      const Message = `

Hello 

Your Timesheet of Weekending  is Rejected by .
        
Reason: ${Comment}

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
            <span style="font-size: 16px;font-weight: 600;">Hello ${handleFullname(item.EmployeeName)},</span>
            <p style="font-size: 14px;margin-top: 40px;">Your Timesheet of Weekending ${handleWeekEndingdate(item.weekNumber, item.Year)} is Rejected by
                <b>${handleFullname(item.ApproverName)}</b>.
                <p><b>Reason: </b>${Comment}</p>
            </p>
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

      sendNotification(item.Email, item.Name, Subject, Message);
    });
  }

  res.status(200).json({ isSuccess: true });
}

const GetEmployeeTimesheetTimeline = async (req, res) => {
  let result = [];
  for (let i in req.body.FKIDs) {
    await EmployeeTimesheet.GetEmployeeTimesheetTimeline(
      req.body.FKIDs[i].Id,
      req.body.Min,
      req.body.Max,
      req.body.Approver
    ).then((data) => {
      data.recordset.forEach((e) => {
        result.push(e);
      });
    });
  }
  if (result.length === 0) {
    res.status(200).json({ isSuccess: false, message: "No Data Exists" });
  } else {
    res.status(200).json({ isSuccess: true, timeline: result });
  }
}

const GetEmployeeTimesheetReports = async (req, res) => {
  let result = [];
  for (let i in req.body.FKIDs) {
    await EmployeeTimesheet.GetEmployeeTimesheetReports(
      req.body.FKIDs[i].Id,
      req.body.Approver
    ).then((data) => {
      data.recordset.forEach((e) => {
        result.push(e);
      });
    });
  }

  if (result.length === 0) {
    res.status(200).json({ isSuccess: false });
  } else {
    res.status(200).json({ isSuccess: true, timeline: result });
  }
}

const GetAllEmployeeTimesheetEeports = async (req, res) => {

  let result = []

  let output = await EmployeeTimesheet.GetAllTimesheetReports();

  output = output.recordset

  let OverTimeHours = await EmployeeTimesheet.GetOverTimeHours();

  OverTimeHours = OverTimeHours.recordset;

  for (let i in output) {

    let OverTime = OverTimeHours.filter(item => item.Id = output[i].Id && item.ProjectCode === `OT-${output[i].ProjectCode}` && item.FK_EmployeeId === output[i].FKEmpId)

    result.push({
      ...output[i],
      OverTime: OverTime.length !== 0 ? OverTime[0].TotalHours : 0,
      check: false,
    });
  }

  if (output.length !== 0) {
    res.status(200).json({ isSuccess: true, AllTimesheetReports: result });
  }

}


const GetMonthlySummary = async (req, res) => {

  let { FKIds, Year, Month, Type, Manager } = req.body

  let report = []

  if (Type === 'Manager') {

    let reporteesIds = []
    const Reportees = await Employees.GetReportingdataId(Manager)
    const AllocatedEmployee = await GetReportedBy(Manager)

    if (Reportees.recordset.length !== 0) {
      Reportees.recordset.forEach((item) => {
        reporteesIds.push(item.ID)
      })
    }

    if (AllocatedEmployee.recordset.length !== 0) {
      const dt = new Date();

      AllocatedEmployee.recordset.forEach((item) => {
        const JoiningDate = new Date(item.JoiningDate);
        const EndingDate = new Date(item.EndingDate);

        if (JoiningDate.getTime() <= dt.getTime()) {
          if (EndingDate.getTime() >= dt.getTime()) {
            reporteesIds.push(item.Id);
          }
        }
      });
    }

    reporteesIds = reporteesIds.filter((item, index) => {
      return index === reporteesIds.findIndex((e) => item === e);
    });

    FKIds = reporteesIds

  }

  for (let i = 0; i < FKIds.length; i++) {

    let monltlyReport = await EmployeeTimesheet.GetTotalWorkingEmployeeTimesheetReports(FKIds[i], Year, Month)

    if (monltlyReport.recordset.length !== 0) {

      report.push(...monltlyReport.recordset)

    }

  }

  report.sort((a, b) => {
    return a.EmployeeName < b.EmployeeName ? 1 : -1
  })

  let result = []

  for (let i = 0; i < report.length; i++) {

    let inividualReport = report.filter(item => item.EmployeeName === report[i].EmployeeName)

    if (inividualReport.length > 1) {

      let monthlyHours = 0

      for (let j = 0; j < inividualReport.length; j++) {

        monthlyHours = monthlyHours + inividualReport[j].MonthlyHours

      }

      inividualReport = inividualReport.filter(item => item.ProjectCode === report[i].ProjectCode)[0]

      result.push({ ...inividualReport, 'MonthlyHours': monthlyHours })

    }
    else {
      result.push(inividualReport[0])
    }

  }

  let MonthlyReports = []
  let holidays = await GetHolidaysByYearANDMONTH(Year, Month)

  for (let i = 0; i < result.length; i++) {

    let businessDays = await getBusinessDaysOfMonth(Month, Year, result[i].Location, holidays)

    let perDayHours = result[i].Location === 1 ? 8 : 9

    MonthlyReports.push({
      ...result[i],
      "BusinessDays": businessDays,
      "BillableDays": (Number.parseInt(result[i].MonthlyHours) / perDayHours)
    })

  }

  // Generic Timesheets
  let genericReports = []
  for (let i = 0; i < FKIds.length; i++) {

    let nonmonthlyreport = await EmployeeTimesheet.GetMonthlyReportForGenericCodes(FKIds[i], Year, Month)

    if (nonmonthlyreport.recordset.length !== 0) {

      genericReports.push(...nonmonthlyreport.recordset)

    }

  }

  genericReports.sort((a, b) => {
    return a.EmployeeName < b.EmployeeName ? 1 : -1
  })

  let genericReportsWithTotalHours = []

  for (let i = 0; i < genericReports.length; i++) {

    let noninividualReport = genericReportsWithTotalHours.filter(item => item.EmployeeName === genericReportsWithTotalHours[i].EmployeeName)

    if (noninividualReport.length !== 0) {
      if (noninividualReport.length > 1) {

        let nonmonthlyHours = 0

        for (let j = 0; j < noninividualReport.length; j++) {

          nonmonthlyHours = nonmonthlyHours + noninividualReport[j].RemainingMonthlyHours

        }

        genericReportsWithTotalHours.push({ ...noninividualReport[0], 'RemainingMonthlyHours': nonmonthlyHours })

      }
      else {
        genericReportsWithTotalHours.push(noninividualReport[0])
      }
    }

  }

  // No Duplicates
  genericReportsWithTotalHours = genericReportsWithTotalHours.filter((obj, index, self) => {
    return (
      index === self.findIndex((o) => o.EmployeeName === obj.EmployeeName)
    );
  })


  // Adding the generic Hours in Monthly Hours based on the employee name
  MonthlyReports = MonthlyReports.map(item => {

    let matchingItem = genericReportsWithTotalHours.find(seconditem => item.EmployeeName === seconditem.EmployeeName);

    if (matchingItem) {
      return { ...item, "RemainingMonthlyHours": matchingItem.RemainingMonthlyHours };
    }
    else {
      return { ...item, "RemainingMonthlyHours": 0 };
    }
  });


  res.status(200).json({ isSuccess: true, MonthlyReport: MonthlyReports })

}


const SendTimesheetReports = async (req, res) => {
  const { mailaddress, Subject, message, ManagerName } = req.body;

  let timesheetReportMailMessage = `

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
              <span style="font-size: 16px;font-weight: 600;">Hi ${ManagerName},</span>
              <p style="font-size: 14px;margin-top: 40px;">>Please find the Timesheet Reports below. </p>
              <br>
              <br>
              <table style='width:100%;border-collapse:collapse;text-align:center;'>
                  ${message}
              </table>
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

  let result = await sendTimesheetReport(
    mailaddress,
    ManagerName,
    Subject,
    timesheetReportMailMessage
  );
  if (result === "Succeeded") {
    res.status(200).json({ isSuccess: true });
  } else {
    res.status(200).json({ isSuccess: false });
  }
}



module.exports = {
  GetWeeklyTimesheetByFKId,
  GetWeeklyTimesheetData,
  CheckStatus,
  ApproveTimesheet,
  RejectTimesheet,
  GetEmployeeTimesheetTimeline,
  GetEmployeeTimesheetReports,
  GetAllEmployeeTimesheetEeports,
  SendTimesheetReports,
  GetMonthlySummary
}



function handleWeekEndingdate(currentWeek, Year) {

  let date = moment().year(Year).week(currentWeek).endOf("week");

  const MONTHS = [
    { id: "01", name: "Jan" },
    { id: "02", name: "Feb" },
    { id: "03", name: "Mar" },
    { id: "04", name: "Apr" },
    { id: "05", name: "May" },
    { id: "06", name: "Jun" },
    { id: "07", name: "Jul" },
    { id: "08", name: "Aug" },
    { id: "09", name: "Sep" },
    { id: "10", name: "Oct" },
    { id: "11", name: "Nov" },
    { id: "12", name: "Dec" },
  ];

  return `${MONTHS.filter((item) => item.name === date._d.toString().split(" ")[1])[0]
    .id
    }/${date._d.toString().split(" ")[2]}/${date._d.toString().split(" ")[3]}`;
}


function handleMonth(weekNum, Year) {
  let month1 = moment().year(Year).week(weekNum).startOf("week");
  let month2 = moment().year(Year).week(weekNum).endOf("week");

  if (
    month1._d.toString().split(" ")[1] === month2._d.toString().split(" ")[1]
  ) {
    return month1._d.toString().split(" ")[1];
  } else {
    return `${month1._d.toString().split(" ")[1]}/${month2._d.toString().split(" ")[1]
      }`;
  }
}

async function handleTimesheet(numberofweeks, data, year) {
  let result = [];

  let Employees_data = await Employees.GetEmployees();

  Employees_data = Employees_data.recordset;

  return new Promise((resolve, rejected) => {
    if (data.length === 0) {
      for (let i = 0; i < numberofweeks; i++) {
        let week = Number.parseInt(i) + 1;
        result.push({
          WeekId: null,
          WeekNumber: week,
          Month: handleMonth(week, year),
          Status: null,
          Total: 0,
          SubmittedDate: null,
          Approver: null,
          UpdatedBy: null,
        });
      }
    } else {
      for (let i = 0; i < numberofweeks; i++) {
        let week = Number.parseInt(i) + 1;

        let timesheet = data.filter(
          (item) => item.WeekNumber === week && item.Year === year
        );

        if (timesheet.length !== 0) {
          let approver =
            timesheet[0].Updated_by === null
              ? timesheet[0].Approver === null
                ? null
                : Employees_data.filter(
                  (item) => item.ID === timesheet[0].Approver
                )[0].FIRSTNAME +
                " " +
                Employees_data.filter(
                  (item) => item.ID === timesheet[0].Approver
                )[0].LASTNAME
              : Employees_data.filter(
                (item) => item.ID === timesheet[0].Updated_by
              )[0].FIRSTNAME +
              " " +
              Employees_data.filter(
                (item) => item.ID === timesheet[0].Updated_by
              )[0].LASTNAME;

          result.push({
            WeekId: timesheet[0].Id,
            WeekNumber: timesheet[0].WeekNumber,
            Month: handleMonth(timesheet[0].WeekNumber, year),
            Status: timesheet[0].Status,
            Total: timesheet[0].TotalHours,
            SubmittedDate: timesheet[0].SubmittedDate,
            Approver: approver,
            UpdatedBy: timesheet[0].Updated_dt,
          });
        } else {
          result.push({
            WeekId: null,
            WeekNumber: week,
            Month: handleMonth(week, year),
            Status: null,
            Total: 0,
            SubmittedDate: null,
            Approver: null,
            UpdatedBy: null,
          });
        }
      }
    }
    resolve(result);
  });
}

function handleFullname(names) {
  const arr = names.split(" ");

  let actualname = "";

  for (let i = 0; i < arr.length; i++) {
    actualname =
      actualname +
      arr[i].substring(0, 1).toUpperCase() +
      arr[i].substring(1).toLowerCase() +
      " ";
  }

  return actualname;
}


async function getBusinessDaysOfMonth(month, year, inp_location, holidays) {

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Set day to 0 to get the last day of the previous month
  const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const workingDays = daysOfMonth.filter(day => !isWeekend(day));
  let count = 0;

  holidays = holidays.recordset

  if (holidays.length !== 0) {
    count = holidays.filter(item => item.OfficeLocation === inp_location).length
  }
  return workingDays.length - count;

}