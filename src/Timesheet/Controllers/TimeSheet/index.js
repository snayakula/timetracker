const timesheet = require("../../Queries/TimeSheet");

const empTimesheet = require("../../Queries/EmployeeTimeSheet");

const { GetEmailForApprover } = require("../../Queries/ProjectAllocation");
const { sendTimesheetReport } = require("../../../../config/Mails/MailSender");

const moment = require("moment");
const CryptoJs = require("crypto-js");

const GetTimesheetWithWeekId = async (req, res) => {
  let data = await timesheet.GetTimesheetWithWeekId(req.body.weekId)
  res.status(200).json({ isSuccess: true, timesheetData: data.recordset });
}

const InsertTimesheet = async (req, res) => {
  const { WeekNumber, Month, Year, JobTitle,
    Status, TotalHours, FKEmployeeId, Comment,
    WeekData, Type, currentStatus, SpecialCondition, count
  } = req.body;


  if (currentStatus === 'Approved' && SpecialCondition === 'MonthEnd' && count > 1) {
    let weekDetails = [...WeekData]
    let values = []
    for (let i = 0; i < weekDetails.length; i++) {

      let newobj = {
        ...weekDetails[i],
        "WK_Day1": count > 0 ? 0 : weekDetails[i].WK_Day1,
        "WK_Day2": count > 1 ? 0 : weekDetails[i].WK_Day2,
        "WK_Day3": count > 2 ? 0 : weekDetails[i].WK_Day3,
        "WK_Day4": count > 3 ? 0 : weekDetails[i].WK_Day4,
        "WK_Day5": count > 4 ? 0 : weekDetails[i].WK_Day5,
        "WK_Day6": count > 5 ? 0 : weekDetails[i].WK_Day6,
        "WK_Day7": count > 6 ? 0 : weekDetails[i].WK_Day7,
        "Ilyas": "ilyas"
      }
      values.push(newobj)

    }

    let result1 = await empTimesheet.InsertEmployeeTimesheet(
      WeekNumber,
      Month,
      Year,
      JobTitle,
      Status,
      TotalHours,
      FKEmployeeId,
      Comment
    );


    if (result1.rowsAffected.length !== 0) {
      let result = await empTimesheet.GetLatestIdForEmployeeTimesheet();
      values.forEach((e) => {
        let total =
          Number.parseFloat(e.WK_Day1) +
          Number.parseFloat(e.WK_Day2) +
          Number.parseFloat(e.WK_Day3) +
          Number.parseFloat(e.WK_Day4) +
          Number.parseFloat(e.WK_Day5) +
          Number.parseFloat(e.WK_Day6) +
          Number.parseFloat(e.WK_Day7);
        if (total > 0) {
          timesheet.InsertTimesheet(
            e.WK_Day1,
            e.WK_Day2,
            e.WK_Day3,
            e.WK_Day4,
            e.WK_Day5,
            e.WK_Day6,
            e.WK_Day7,
            e.Id,
            result.recordset[0][""],
            FKEmployeeId
          );
        }
      });

      res.status(200).json({
        isSuccess: true,
        message: "Timesheet data has been submitted",
      });

    } else {
      res.status(200).json({ isSuccess: false });
    }

  }
  else {
    // insert the employee timesheet
    let result1 = await empTimesheet.InsertEmployeeTimesheet(
      WeekNumber,
      Month,
      Year,
      JobTitle,
      Status,
      TotalHours,
      FKEmployeeId,
      Comment
    );

    if (result1.rowsAffected.length !== 0) {
      // get the latest ID from employee timesheet
      let result = await empTimesheet.GetLatestIdForEmployeeTimesheet();
      // insert the timesheet data with  only if the total value if greater then one

      WeekData.forEach((e) => {
        let total =
          Number.parseFloat(e.WK_Day1) +
          Number.parseFloat(e.WK_Day2) +
          Number.parseFloat(e.WK_Day3) +
          Number.parseFloat(e.WK_Day4) +
          Number.parseFloat(e.WK_Day5) +
          Number.parseFloat(e.WK_Day6) +
          Number.parseFloat(e.WK_Day7);
        if (total > 0) {
          timesheet.InsertTimesheet(
            e.WK_Day1,
            e.WK_Day2,
            e.WK_Day3,
            e.WK_Day4,
            e.WK_Day5,
            e.WK_Day6,
            e.WK_Day7,
            e.Id,
            result.recordset[0][""],
            FKEmployeeId
          );
        }
      });

      if (Status === "Submitted" && Type === "normal") {
        const Subject = "Timesheet Submission";

        GetEmailForApprover(FKEmployeeId, WeekNumber).then((res) => {

          let new_arr = []
          res.recordset.map((item) => {
            if (handleExpiryDate(item.Expiry_dt)) {
              if (handleJoiningDate(item.Joining_dt) && handleEndingDate(item.Ending_dt)) {
                new_arr.push(item)
              }
            }
          })

          new_arr.forEach((item) => {
            sendTimesheetReport(
              item.Email,
              item.EmployeeName,
              Subject,
              getTimesheetMessage(
                result.recordset[0][""],
                FKEmployeeId,
                Comment,
                item.Approver,
                item.EmployeeName,
                WeekNumber,
                Year
              )
            ).then((result) => {
              console.log(result)
            }).catch((err) => {
              console.log(err)
            })
          });
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: "Timesheet data has been submitted",
      });
    } else {
      res.status(200).json({ isSuccess: false });
    }
  }
}

const UpdateTimesheet = async (req, res) => {

  const {
    WeekId,
    Status,
    TotalHours,
    FKEmployeeId,
    Comment,
    WeekData,
    Type,
    WeekNumber,
    Year
  } = req.body;
  // update the employee time sheet data using weekId and FKEmpId

  await empTimesheet.UpdateEmployeeTimesheet(
    WeekId,
    TotalHours,
    Comment,
    Status,
    FKEmployeeId
  );

  // delete the previous timesheet records for time weekId
  await timesheet.DeleteTimesheetByWeekId(WeekId);

  // insert the new timesheet data again in timesheet
  WeekData.forEach((e) => {
    let total =
      Number.parseInt(e.WK_Day1) +
      Number.parseInt(e.WK_Day2) +
      Number.parseInt(e.WK_Day3) +
      Number.parseInt(e.WK_Day4) +
      Number.parseInt(e.WK_Day5) +
      Number.parseInt(e.WK_Day6) +
      Number.parseInt(e.WK_Day7);
    if (total > 0) {
      timesheet.InsertTimesheet(
        e.WK_Day1,
        e.WK_Day2,
        e.WK_Day3,
        e.WK_Day4,
        e.WK_Day5,
        e.WK_Day6,
        e.WK_Day7,
        e.Id,
        WeekId,
        FKEmployeeId
      );
    }
  });

  if (Status === "Submitted" && Type === "normal") {
    const Subject = "Timesheet Submission";

    GetEmailForApprover(FKEmployeeId, WeekNumber).then((res) => {
      let new_arr = []
      res.recordset.map((item) => {
        if (handleExpiryDate(item.Expiry_dt)) {
          if (handleJoiningDate(item.Joining_dt) && handleEndingDate(item.Ending_dt)) {
            new_arr.push(item)
          }
        }
      })

      new_arr.forEach((item) => {
        sendTimesheetReport(
          item.Email,
          item.EmployeeName,
          Subject,
          getTimesheetMessage(
            WeekId,
            FKEmployeeId,
            Comment,
            item.Approver,
            item.EmployeeName,
            WeekNumber,
            Year
          )
        ).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      });
    });
  }

  res.status(200).json({ isSuccess: true });
}


const GetTimesheetDetailsSpecialCondition = async (req, res) => {

  const { WeekNumber, Year, FKEmpId } = req.body

  let timesheetDetails = []

  let defaultCodes = await timesheet.GetTimesheetDetailsDefaultCodes(FKEmpId, WeekNumber, Year)

  defaultCodes = defaultCodes.recordset

  let projectCodes = await timesheet.GetTimesheetDetailsProjectCodes(FKEmpId, WeekNumber, Year)

  projectCodes = projectCodes.recordset
  let ROLE = projectCodes.length !== 0 ? projectCodes[0].ROLE : ""

  projectCodes = [...defaultCodes, ...projectCodes]

  projectCodes.sort((a, b) => {
    a.ProjectCode > b.ProjectCode ? 1 : -1
  })

  let number = projectCodes.length

  for (let i = 0; i < number; i++) {

    let timesheet = projectCodes.filter((item) => item.ProjectCode === projectCodes[0].ProjectCode)

    if (timesheet.length === 0) {
      continue;
    }

    if (timesheet.length > 1) {

      if (timesheet[0].Id !== timesheet[1].Id) {
        let obj = {
          "Id": timesheet[0].Id,
          "WK_Day1": timesheet[0].WK_Day1 + timesheet[1].WK_Day1,
          "WK_Day2": timesheet[0].WK_Day2 + timesheet[1].WK_Day2,
          "WK_Day3": timesheet[0].WK_Day3 + timesheet[1].WK_Day3,
          "WK_Day4": timesheet[0].WK_Day4 + timesheet[1].WK_Day4,
          "WK_Day5": timesheet[0].WK_Day5 + timesheet[1].WK_Day5,
          "WK_Day6": timesheet[0].WK_Day6 + timesheet[1].WK_Day6,
          "WK_Day7": timesheet[0].WK_Day7 + timesheet[1].WK_Day7,
          "Work": timesheet[0].ProjectCode,
          "ProjectName": timesheet[0].ProjectName,
          "ExpiryDate": timesheet[0].Expiry_DT,
          "EndingDate": timesheet[0].ENDING_DT,
          "JoiningDate": timesheet[0].JOINING_DT,
          "Type": timesheet[0].TYPENAME
        }

        timesheetDetails.push(obj)
        projectCodes.splice(0, timesheet.length)
      }
      else {
        let obj = {
          "Id": timesheet[0].Id,
          "WK_Day1": timesheet[0].WK_Day1,
          "WK_Day2": timesheet[0].WK_Day2,
          "WK_Day3": timesheet[0].WK_Day3,
          "WK_Day4": timesheet[0].WK_Day4,
          "WK_Day5": timesheet[0].WK_Day5,
          "WK_Day6": timesheet[0].WK_Day6,
          "WK_Day7": timesheet[0].WK_Day7,
          "Work": timesheet[0].ProjectCode,
          "ProjectName": timesheet[0].ProjectName,
          "Expiry_dt": timesheet[0].Expiry_DT,
          "Ending_dt": timesheet[0].ENDING_DT,
          "Joining_dt": timesheet[0].JOINING_DT,
          "Type": timesheet[0].TYPENAME
        }
        timesheetDetails.push(obj)
        let sameIdlength = projectCodes.filter(item => item.Id === timesheet[0].Id).length
        projectCodes.splice(0, sameIdlength)
      }

    }
    else {
      let obj = {
        "Id": timesheet[0].Id,
        "WK_Day1": timesheet[0].WK_Day1,
        "WK_Day2": timesheet[0].WK_Day2,
        "WK_Day3": timesheet[0].WK_Day3,
        "WK_Day4": timesheet[0].WK_Day4,
        "WK_Day5": timesheet[0].WK_Day5,
        "WK_Day6": timesheet[0].WK_Day6,
        "WK_Day7": timesheet[0].WK_Day7,
        "Work": timesheet[0].ProjectCode,
        "ProjectName": timesheet[0].ProjectName,
        "Expiry_dt": timesheet[0].Expiry_DT,
        "Ending_dt": timesheet[0].ENDING_DT,
        "Joining_dt": timesheet[0].JOINING_DT,
        "Type": timesheet[0].TYPENAME
      }
      timesheetDetails.push(obj)
      projectCodes.splice(0, 1)
    }

  }

  res.status(200).json({
    isSuccess: true,
    Timesheet: timesheetDetails,
    ROLE: ROLE
  })

}


module.exports = {
  GetTimesheetWithWeekId,
  InsertTimesheet,
  UpdateTimesheet,
  GetTimesheetDetailsSpecialCondition
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

function getTimesheetMessage(
  weekId,
  FKEmpId,
  Comment,
  Approver,
  EmployeeName,
  WeekNumber,
  Year
) {
  let Approve_URL = `${process.env.UI_URL}/process/${CryptoJs.AES.encrypt(
    JSON.stringify({
      WeekId: weekId,
      FKEmpId: FKEmpId,
      Comment: Comment,
      Process: "Approved",
    }),
    process.env.SECRECT_KEY
  )
    .toString()
    .split("/")
    .join("|")}`;

  let Reject_URL = `${process.env.UI_URL}/process/${CryptoJs.AES.encrypt(
    JSON.stringify({
      WeekId: weekId,
      FKEmpId: FKEmpId,
      Comment: Comment,
      Process: "Rejected",
    }),
    process.env.SECRECT_KEY
  )
    .toString()
    .split("/")
    .join("|")}`;

  return `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Message</title>
                    </head>
                    <body>
                        <div style="font-family: Arial, Helvetica, sans-serif;">
                            <div style="width: 500px;background: #f7f5f5;padding: 20px;
                            border-radius: 5px;">
                                <h1>Timesheet Submission</h1>
                               <p>Hello <b>${handleFullname(Approver)}</b></p>
                                <p><b>${handleFullname(EmployeeName)}</b> is Submitted Timesheet for the week
                                    <b>${handleWeekEndingdate(WeekNumber, Year)}</b>.
                                </p>
                                <div style="display: flex;
                                justify-content: space-evenly;align-items: center;">
                                    <a style="text-decoration: none;color: #fff;background: #025b9a;padding: 10px 20px !important;border-radius: 5px !important;cursor: pointer;font-size: 14px;"
                                        href=${Approve_URL}>Approve</a>
                                    <a style="text-decoration: none;color: #fff;background: #025b9a;padding: 10px 20px !important;border-radius: 5px !important;cursor: pointer;font-size: 14px;"
                                        href=${Reject_URL}>Reject</a>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>        
                    `;
}

const handleJoiningDate = (jnDate) => {

  let JoiningDate = new Date(jnDate)
  let dt = new Date()

  let result = false

  if (JoiningDate.getTime() <= dt.getTime()) {
    result = true
  }
  else {
    result = false
  }

  return result

}

const handleEndingDate = (endDate) => {

  let EndingDate = new Date(endDate)
  let result = false
  let dt = new Date()


  if (EndingDate.getTime() > dt.getTime()) {
    result = true
  }
  else {
    result = false
  }

  return result
}

const handleExpiryDate = (expDate) => {
  let expiryDate = new Date(expDate)

  let result = false
  let dt = new Date()


  if (expiryDate.getTime() >= dt.getTime()) {
    result = true
  }
  else {
    result = false
  }

  return result
}