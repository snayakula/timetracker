const { getWeek } = require('date-fns')
const moment = require('moment')

// need to change the import
// const EmployeeTimesheet = require('.././Queries/EmployeeTimeSheet')
const EmployeeTimesheet = require('../../src/Timesheet/Queries/EmployeeTimeSheet')
const {
    GetProjectAllocatedEmployees,
    GetAllocatedEmployees,
    GetPayCycleAllocation
} = require('../../src/Timesheet/Queries/ProjectAllocation')

const { SendMailAzure } = require('../../config/Mails/MailSender')


function handleWeekEndingdate(currentWeek) {

    const dt = new Date()

    let date = moment().year(dt.getFullYear()).week(currentWeek).endOf('week')

    const MONTHS = [{ id: "01", name: "Jan" }, { id: "02", name: "Feb" }, { id: "03", name: "Mar" },
    { id: "04", name: "Apr" }, { id: "05", name: "May" }, { id: "06", name: "Jun" },
    { id: "07", name: "Jul" }, { id: "08", name: "Aug" }, { id: "09", name: "Sep" },
    { id: "10", name: "Oct" }, { id: "11", name: "Nov" }, { id: "12", name: "Dec" },]

    return `${MONTHS.filter(item => item.name === date._d.toString().split(' ')[1])[0].id}/${date._d.toString().split(' ')[2]}/${date._d.toString().split(' ')[3]}`


}

const handleDefaulterEmployees = async () => {

    let defaulters = []

    let currentWeek = getWeek(new Date())

    currentWeek = currentWeek - 1

    let employees = await GetProjectAllocatedEmployees()

    const currentDate = new Date()

    let data = employees.recordset

    for (let i in data) {

        let expiryDate = new Date(data[i].Expiry_dt)

        let joiningDate = new Date(data[i].joining_dt)

        if (expiryDate.getTime() > currentDate.getTime()) {
            if (joiningDate.getTime() < currentDate.getTime()) {
                defaulters.push({
                    Id: data[i].Id,
                    address: data[i].Email,
                    displayName: data[i].displayName
                })
            }
        }
    }

    defaulters = defaulters.filter((item, index) => {
        return index === defaulters.findIndex((e) => item.address === e.address)
    })

    let result = []

    for (let i in defaulters) {

        let res = await EmployeeTimesheet.CheckDefaulters(defaulters[i].Id, Number.parseInt(currentWeek))

        if (res.recordset.length === 0) {
            result.push({
                address: defaulters[i].address,
                displayName: defaulters[i].displayName
            })
        }
        else {
            if (res.recordset[0].Status === 'Pending') {
                result.push({
                    address: defaulters[i].address,
                    displayName: defaulters[i].displayName
                })
            }
        }


    }

    if (result.length !== 0) {

        const Subject = 'Timesheet Submission Reminder'

        const weekEndingDate = handleWeekEndingdate(currentWeek)


        for (let i = 0; i < result.length; i++) {

            let names = result[i].displayName.split(' ')

            let actualname = ''

            for (let i = 0; i < names.length; i++) {

                actualname = actualname + names[i].substring(0, 1).toUpperCase() + names[i].substring(1).toLowerCase() + ' '

            }

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
                  <span style="font-size: 16px;font-weight: 600;">Hello  ${actualname},</span>
                  <p style="font-size: 14px;margin-top: 40px;">We trust you're having a productive week. It has come to our attention that your timesheet for the week ending [${weekEndingDate}] has not been submitted yet.

                  We kindly request that you take a moment to enter your work hours and tasks in the system as soon as possible.
                  
                  Your cooperation is highly appreciated. Please ignore this email if you have already updated your timesheet.
                  </p>
                  <div style="display: flex;
                  justify-content: center;align-items: center;margin-top: 50px;gap: 30px;">
                      <img style="width: 60px;"
                          src="https://www.genzeon.com/wp-content/uploads/2022/03/genzeon-logo-notag-2022.png"
                          alt="genzeon" />
                      <span style="font-size:22px;font-weight: 600;letter-spacing: 2px;">iEmployee</span>
                  </div>
              </div>
          </div>
      </body> 
      </html>

    
            `

            let output = await SendMailAzure(result[i].address, result[i].displayName, Subject, Message)

            if (output === 'Succeeded') {
                console.log('Reminders Notification Done')
            }
        }

    }

}

const handleReminderEmployees = async () => {

    let reminder = []

    let employees = await GetProjectAllocatedEmployees()

    const currentDate = new Date()

    let data = employees.recordset

    for (let i in data) {
        let expiryDate = new Date(data[i].Expiry_dt)

        let joiningDate = new Date(data[i].joining_dt)

        if (expiryDate.getTime() > currentDate.getTime()) {
            if (joiningDate.getTime() < currentDate.getTime()) {
                reminder.push({
                    address: data[i].Email,
                    displayName: data[i].displayName
                })
            }
        }
    }

    reminder = reminder.filter((item, index) => {
        return index === reminder.findIndex((e) => item.address === e.address)
    })

    if (reminder.length !== 0) {

        const Subject = "Weekly Timesheet Reminder"


        for (let i = 0; i < reminder.length; i++) {

            let names = reminder[i].displayName.split(' ')

            let actualname = ''

            for (let i = 0; i < names.length; i++) {

                actualname = actualname + names[i].substring(0, 1).toUpperCase() + names[i].substring(1).toLowerCase() + ' '

            }

            let Message = `


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
            <span style="font-size: 16px;font-weight: 600;">Dear  ${actualname},</span>
            <p style="font-size: 14px;margin-top: 40px;">This is a friendly reminder to submit your timesheet for the current week.

            Please make sure to log all your work hours and tasks by the end of the day on Friday. Your efforts contribute greatly to our success.
            
            Thank you for your dedication and hard work. Please ignore this email if you have already updated your timesheet.
            </p>
            <div style="display: flex;
            justify-content: center;align-items: center;margin-top: 50px;gap: 30px;">
                <img style="width: 60px;"
                    src="https://www.genzeon.com/wp-content/uploads/2022/03/genzeon-logo-notag-2022.png"
                    alt="genzeon" />
                <span style="font-size:22px;font-weight: 600;letter-spacing: 2px;">iEmployee</span>
            </div>
        </div>
    </div>
</body> 
</html>
`

            let result = await SendMailAzure(reminder[i].address, reminder[i].displayName, Subject, Message)

            if (result === 'Succeeded') {
                console.log('Reminders Notification Done')
            }
        }
    }


}

const handleMonthEndReminder = async () => {

    const result = await GetAllocatedEmployees()
    // Mail sender
    const currentDate = new Date()

    let Reminder = []

    let data = result.recordset

    for (let i in data) {
        let expiryDate = new Date(data[i].expiry_dt)

        let joiningDate = new Date(data[i].joining_dt)

        if (expiryDate.getTime() > currentDate.getTime()) {
            if (joiningDate.getTime() < currentDate.getTime()) {
                Reminder.push({
                    address: data[i].Email,
                    displayName: data[i].displayName
                })
            }
        }
    }
    Reminder = Reminder.filter((item, index) => {
        return index === Reminder.findIndex((e) => item.address === e.address)
    })

    if (Reminder.length !== 0) {

        const Subject = "Month-End Timesheet Reminder"


        for (let i = 0; i < Reminder.length; i++) {

            let names = Reminder[i].displayName.split(' ')

            let actualname = ''

            for (let i = 0; i < names.length; i++) {

                actualname = actualname + names[i].substring(0, 1).toUpperCase() + names[i].substring(1).toLowerCase() + ' '

            }


            let Message = `



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
            <span style="font-size: 16px;font-weight: 600;">Dear  ${actualname},</span>
            <p style="font-size: 14px;margin-top: 40px;">As we completed the month, we'd like to remind you to complete any pending timesheet submission.

            Your timely cooperation contributes to the smooth operation of our processes. 
            
            Thank you for your attention to this matter. Please ignore this email if you have already updated your timesheet.
            </p>
            <div style="display: flex;
            justify-content: center;align-items: center;margin-top: 50px;gap: 30px;">
                <img style="width: 60px;"
                    src="https://www.genzeon.com/wp-content/uploads/2022/03/genzeon-logo-notag-2022.png"
                    alt="genzeon" />
                <span style="font-size:22px;font-weight: 600;letter-spacing: 2px;">iEmployee</span>
            </div>
        </div>
    </div>
</body> 
</html>

        `

            let message = await SendMailAzure(Reminder[i].address, Reminder[i].displayName, Subject, Message)

            if (message === 'Succeeded') {
                console.log('Reminders Notification Done')
            }
        }

    }
}

const handlePayCycleAllocation = async () => {

    let result = await GetPayCycleAllocation();

    const currentDate = new Date();

    let PayCycle = [];

    let data = result.recordset;

    for (let i in data) {
        let expiryDate = new Date(data[i].Expiry_dt);
        let joiningDate = new Date(data[i].joining_dt);
        if (expiryDate.getTime() > currentDate.getTime()) {
            if (joiningDate.getTime() < currentDate.getTime()) {
                PayCycle.push({
                    address: data[i].Email,
                    displayName: data[i].displayName,
                });
            }
        }
    }

    PayCycle = PayCycle.filter((item, index) => {
        return index === PayCycle.findIndex((e) => item.address === e.address);
    });

    if (PayCycle.length !== 0) {

        const Subject = "Pay Cycle Ending Timesheet Reminder"

        for (let i = 0; i < PayCycle.length; i++) {

            let names = PayCycle[i].displayName.split(' ')

            let actualname = ''

            for (let i = 0; i < names.length; i++) {

                actualname = actualname + names[i].substring(0, 1).toUpperCase() + names[i].substring(1).toLowerCase() + ' '

            }


            let Message = `
    
Hi ${actualname},

We wanted to give you a heads-up that the current pay cycle is ended. Please ensure that any pending timesheets is submitted.

Your prompt submission helps us ensure accurate and timely processing of payments.

Thank you for your cooperation. Please ignore this email if you have already updated your timesheet.

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
            <span style="font-size: 16px;font-weight: 600;">Dear  ${actualname},</span>
            <p style="font-size: 14px;margin-top: 40px;">We wanted to give you a heads-up that the current pay cycle is ended. Please ensure that any pending timesheets is submitted.

            Your prompt submission helps us ensure accurate and timely processing of payments.
            
            Thank you for your cooperation. Please ignore this email if you have already updated your timesheet.
            </p>
            <div style="display: flex;
            justify-content: center;align-items: center;margin-top: 50px;gap: 30px;">
                <img style="width: 120px;"
                    src="https://www.genzeon.com/wp-content/uploads/2022/03/genzeon-logo-notag-2022.png"
                    alt="genzeon" />
                <span style="font-size:22px;font-weight: 600;letter-spacing: 2px;">iEmployee</span>
            </div>
        </div>
    </div>
</body> 
</html>
            
            `

            let message = await SendMailAzure(PayCycle[i].address, PayCycle[i].displayName, Subject, Message)

            if (message === "Succeeded") {
                console.log("PayCycle Notification Done");
            }
        }
    }
}


// Password Generator

const min = 111
const max = 999
const UpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const specialCharacters = ['!', '@', '#', '$', '%']

const GeneratePassword = () => {

    const number = Math.floor(Math.random() * (max - min) + min)
    const spacialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)]

    return `${UpperCase[Math.floor(Math.random() * UpperCase.length)]}${lowerCase[Math.floor(Math.random() * lowerCase.length)]}${lowerCase[Math.floor(Math.random() * lowerCase.length)]}${UpperCase[Math.floor(Math.random() * UpperCase.length)]}${spacialChar}${number}`

}


function getCapitalized(name) {

    let newName = ''
    let oldName = name.split(' ')

    oldName.forEach((item) => {

        newName = newName + item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase() + " "

    })

    return newName

}

module.exports = {
    GeneratePassword,
    handleDefaulterEmployees,
    handleReminderEmployees,
    handleMonthEndReminder,
    handlePayCycleAllocation,
    getCapitalized
}