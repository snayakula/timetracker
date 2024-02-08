const express = require("express")
const cors = require("cors")
const bodyParse = require("body-parser")
require('dotenv').config();
const MailScheduler = require('node-cron')
const SwaggerUI = require('swagger-ui-express')
const SwaggerJsDocs = require('swagger-jsdoc')

const { verify } = require('./src/middlewares')
const Public = require('./public')
const {
    handleDefaulterEmployees,
    handleReminderEmployees,
    handleMonthEndReminder,
    handlePayCycleAllocation
} = require('./config/utils')

const MyProfile = require('./src/MyProfile')
const MyTime = require('./src/Timesheet')
const TemporaryEmployees = require('./src/TempProfile')
const Mail = require('./config/Mails');

const Port = process.env.PORT || 8081

const app = express()

// Middlewares
app.use(cors({
    origin: ["http://localhost:3000",
        "https://iemployee.genzeon.com","https://prd-iemp-ui.azurewebsites.net"
    ]
}))

app.use(express.json())

app.use(bodyParse.urlencoded({ extended: true }))
app.use('/', Public)
app.use('/Config/Uploads', express.static('./Config/Uploads'))





/*    Routes    */

app.use('/iemployee', verify, MyProfile)

app.use('/timesheet', verify, MyTime)

app.use('/temp-iemployee', verify, TemporaryEmployees)

app.use('/mail', verify, Mail)



// Swagger


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "iEmployee Swagger",
            version: "1.0.0",
            description: "An simple Expres library API",
            contact: {
                email: "www.google.com"//gmail or any amil to contact
            },

        },
        security: [
            {
                "bearerAuth": []
            }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [{
            url: "/"
        }],
    },
    apis: ["./src/*/*/*.js",

    ]
}


const swaggerSpecs = SwaggerJsDocs(swaggerOptions)

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpecs))



// Defaulter Mails - Every Monday 
MailScheduler.schedule('0 13 * * 1', () => {
    handleDefaulterEmployees()
})

// Reminder Mails - Every Friday
MailScheduler.schedule('0 13 * * 5', () => {
    handleReminderEmployees()
})

// Month End Reminder - Every Month 1st
MailScheduler.schedule('0 13 1 * *', () => {
    handleMonthEndReminder()
})

// Pay Cycle Reminder -- Every 16th of Month
MailScheduler.schedule('0 13 16 * *', () => {
    handlePayCycleAllocation()
})

app.get('/*', (req, res) => {
    res.send(`
    <div style="display: flex; justify-content: center; align-items: flex-start; height : 100vh">
        <h2 style="color: red;">Error 404 - Page Not Found </h2>
    </div>
    `)
})


module.exports = app.listen(Port, () => {
    console.log("Server is running on the port " + Port)
})








// Minute (0 - 59)
// Hour (0 - 23)
// Day of the Month (1 - 31)
// Month (1 - 12)
// Day of the Week (0 - 6), where Sunday is 0 and Saturday is 6


// 0 in the minute field: This means the task will be scheduled at the 0th minute of the hour.
// 9 in the hour field: This means the task will be scheduled at the 9th hour of the day (9 AM).
// * in the day of the month field: This means the task will run on any day of the month.
// * in the month field: This means the task will run in any month.
// 1 in the day of the week field: This means the task will run on Monday (since Sunday is 0, Monday is 1).
