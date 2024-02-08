const Employees = require("../../Queries/Employees");
const {
    DeleteEmployeeById,
    GetInitialDetails,
} = require("../../Queries/Procedures");
const {
    GetOverTimeHours,
    GetEmployeeTimesheetByReportingManager,
} = require("../../../Timesheet/Queries/EmployeeTimeSheet");
const moment = require("moment");


const GetInitialDetailsController = async (req, res) => {

    const { FKEmpId, NumberOfWeeks, Year } = req.body;

    let result = await GetInitialDetails(FKEmpId, Year);

    if (result === undefined) {
        res.status(200).json({ isSuccess: false });
    }

    let timesheetData = await handleTimesheetApprovals(
        result.recordsets[13],
        FKEmpId
    )

    let data = {
        Designations: result.recordsets[0],
        PracticeAreas: result.recordsets[1],
        Educations: result.recordsets[2],
        Domains: result.recordsets[3],
        Employees: result.recordsets[4],
        EmployeeApprovals: result.recordsets[5],
        Users: result.recordsets[6],
        Roles: result.recordsets[7],
        Clients: result.recordsets[8],
        EmployeeAudit: result.recordsets[9],
        WeeklyTimesheet: await handleTimesheet(
            NumberOfWeeks,
            result.recordsets[10],
            Year
        ),
        TimesheetReportees: result.recordsets[11],
        // TimesheetReports: result.recordsets[12],
        TimesheetReports: timesheetData,
        TimesheetApprovals: timesheetData,
        AllocatedProjects: result.recordsets[14],
        ProjectCodes: result.recordsets[15],
    };

    res.status(200).json({
        isSuccess: true,
        InitialDetails: data,
    });

}

const DeleteEmployeeByIdController = async (req, res) => {
    await DeleteEmployeeById(req.body.Id)
    res.status(200).json({ isSuccess: true });
}


module.exports = {
    GetInitialDetailsController,
    DeleteEmployeeByIdController
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
    let Employees_data = await Employees.GetEmployees();

    Employees_data = Employees_data.recordset;

    return new Promise((resolved, reject) => {
        let result = [];

        for (let i = 0; i < numberofweeks; i++) {
            let week = Number.parseInt(i) + 1;

            let timesheet = data.filter(
                (item) => item.WeekNumber === week && item.Year === year
            );

            if (timesheet.length !== 0) {

                let number = timesheet.length - 1

                let approver =
                    timesheet[number].Updated_by === null
                        ? timesheet[number].Approver === null
                            ? null
                            : Employees_data.filter(
                                (item) => item.ID === timesheet[number].Approver
                            )[0].FIRSTNAME +
                            " " +
                            Employees_data.filter(
                                (item) => item.ID === timesheet[number].Approver
                            )[0].LASTNAME
                        : Employees_data.filter(
                            (item) => item.ID === timesheet[number].Updated_by
                        )[0].FIRSTNAME +
                        " " +
                        Employees_data.filter(
                            (item) => item.ID === timesheet[number].Updated_by
                        )[0].LASTNAME;
                result.push({
                    WeekId: timesheet[number].Id,
                    WeekNumber: timesheet[number].WeekNumber,
                    Month: handleMonth(timesheet[number].WeekNumber, year),
                    Status: timesheet[number].Status,
                    Total: timesheet[number].TotalHours,
                    SubmittedDate: timesheet[number].SubmittedDate,
                    Approver: approver,
                    UpdatedBy: timesheet[number].Updated_dt,
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

        resolved(result);
    });
}

async function handleTimesheetApprovals(data, FKEmpId) {

    let data1 = await GetEmployeeTimesheetByReportingManager(FKEmpId);

    let output = [...data, ...data1.recordset];

    output = output.filter((item, index) => {
        return (
            index ===
            output.findIndex(
                (e) => item.Id === e.Id && item.ProjectCode === e.ProjectCode
            )
        );
    });

    let OverTimeHours = await GetOverTimeHours();

    OverTimeHours = OverTimeHours.recordset;

    let result = [];

    for (let i in output) {

        let OverTime = OverTimeHours.filter(item => item.Id = output[i].Id && item.ProjectCode === `OT-${output[i].ProjectCode}` && item.FK_EmployeeId === output[i].FKEmpId)

        result.push({
            ...output[i],
            OverTime: OverTime.length !== 0 ? OverTime[0].TotalHours : 0,
            check: false,
        });
    }

    return result;
}