const { getCapitalized } = require("../../../../config/utils")
const { GetEmployees } = require("../../../MyProfile/Queries/Employees")
const { GetHolidaysByYear, InsertHoliday, GetHolidaysByName } = require("../../Queries/Holidays")


const GetHolidays = async (req, res) => {

    const { year } = req.params

    if (year === undefined || year === null || year === "undefined" || year === "null") {
        res.status(400).json({ isSuccess: false })

    }
    else {
        let result = await GetHolidaysByYear(Number.parseInt(year))
        let Employees = await GetEmployees()
        result = result.recordset
        Employees = Employees.recordset
        let values = []


        for (let i = 0; i < result.length; i++) {

            let empData = Employees.filter(item => item.ID === result[i].Created_By)

            values.push({
                ...result[i], 'UploadedBy': empData.length === 0
                    ?
                    "Not Available"
                    :
                    getCapitalized((empData[0].FIRSTNAME + " " + empData[0].LASTNAME))
            })

        }


        res.status(200).json({
            isSuccess: true,
            Holidays: values
        })
    }
}

const InsertHolidays = async (req, res) => {

    const { HolidayData, FKEmpId } = req.body

    let month = 0
    let year = 0

    let successRate = 0

    for (let i = 0; i < HolidayData.length; i++) {

        const dt = new Date(HolidayData[i].HolidayDate)

        month = dt.getMonth() + 1

        year = dt.getFullYear()

        let isCheckHoliday = await GetHolidaysByName(year, HolidayData[i].HolidayName, HolidayData[i].Location)

        if (isCheckHoliday.recordset.length === 0) {

            let result = await InsertHoliday(HolidayData[i].HolidayName, HolidayData[i].HolidayDate, month, year, HolidayData[i].Location, FKEmpId)

            if (result.rowsAffected.length !== 0) {
                successRate += 1
            }
            else {
                successRate = successRate === 0 ? 0 : successRate - 1
            }
        }
        else {
            successRate = successRate === 0 ? 0 : successRate - 1
        }

    }


    let LatestHolidays = await GetHolidaysByYear(new Date().getFullYear())

    LatestHolidays = LatestHolidays.recordset

    if (successRate === 0) {
        res.status(200).json({
            isSuccess: false,
            numberOfHolidayPassed: successRate,
            message: "Please check the List once because holiday may already be in the System",
            updatedHolidays: LatestHolidays
        })
    }
    else {
        res.status(200).json({
            isSuccess: true,
            numberOfHolidayPassed: successRate,
            message: "Uploaded Succssfully",
            updatedHolidays: LatestHolidays
        })
    }


}


module.exports = {
    GetHolidays,
    InsertHolidays
}