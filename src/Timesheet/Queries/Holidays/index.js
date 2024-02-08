const { handleRunQuery } = require('../../../../config/db/db')


const GetHolidaysByYear = async (year) => {

    const query = `
    
    SELECT * FROM HOLIDAYS
    WHERE HOLIDAYYEAR = ${Number.parseInt(year)}
    
    `

    return await handleRunQuery(query, 'GetHolidaysByYear')

}

const GetHolidaysByYearANDMONTH = async (year, month) => {

    const query = `
    SELECT * FROM HOLIDAYS
    WHERE HOLIDAYYEAR = ${Number.parseInt(year)}
    AND HOLIDAYMONTH = ${Number.parseInt(month)}
    `

    return await handleRunQuery(query, 'GetHolidaysByYear')

}


const GetHolidaysByName = async (year, name, location) => {

    const query = `
    
    SELECT * FROM HOLIDAYS
    WHERE HOLIDAYYEAR = ${Number.parseInt(year)} and HOLIDAYNAME = '${name}' and OFFICELOCATION = ${Number.parseInt(location)}
    
    `

    return await handleRunQuery(query, 'GetHolidaysByName')

}

const InsertHoliday = async (Name, holidayDate, month, year, officeLocation, FKEmpId) => {

    const dt = new Date()

    const date = `${dt.getUTCFullYear()}-${dt.getUTCMonth() + 1}-${dt.getUTCDate()} ${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`

    const query = `
    
    INSERT INTO 
    HOLIDAYS(HolidayName,HolidayDate,HolidayMonth,HolidayYear,OfficeLocation,Created_by,Created_dt)
    VALUES('${Name}',CONVERT(DATETIME,'${holidayDate}'),${Number.parseInt(month)},
    ${Number.parseInt(year)},${Number.parseInt(officeLocation)},${FKEmpId === null ? FKEmpId : Number.parseInt(FKEmpId)},CONVERT(DATETIME,'${date}'))
    
    `

    return await handleRunQuery(query, 'InsertHoliday')

}


module.exports = {
    GetHolidaysByYear,
    GetHolidaysByName,
    InsertHoliday,
    GetHolidaysByYearANDMONTH
}