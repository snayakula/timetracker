const { EmailClient } = require("@azure/communication-email");

const ConnectionString = "endpoint=https://gznprodcommunicationservices.unitedstates.communication.azure.com/;accesskey=Q2NQX+uHC4t5njkEsiCTV9/OhY0LQy9EnPDO6gooRXS+G/6AGRy+QciyV7plNlZ+4n2M/hGjqz56Rw+XdakwFA=="

const client = new EmailClient(ConnectionString)

const SendMailAzure = async (mailAddress, Name, Subject, message) => {

    const Message = {
        senderAddress: process.env.MAIL_ADDRESS,
        senderName: "iEmployee",
        content: {
            subject: Subject,
            html: message
        },
        recipients: {
            to: [
                {
                    address: mailAddress,
                    displayName: Name
                }
            ]
        },
    }
    const pollar = await client.beginSend(Message)
    const response = await pollar.pollUntilDone()

    return response.status

}

const SendMailAzureWithSubject = async (mailAddress, subject, message) => {

    const Message = {
        senderAddress: process.env.MAIL_ADDRESS,
        senderName: "iEmployee",
        content: {
            subject: subject,
            html: message
        },
        recipients: {
            to: mailAddress
        },
    }
    const pollar = await client.beginSend(Message)
    const response = await pollar.pollUntilDone()

    return response.status

}

const sendNotification = async (mailAddress, name, subject, message) => {
    const Message = {
        // senderAddress: "DoNotReply@9d6b57e8-bfc5-454b-a5e4-2bcb3d837fa3.azurecomm.net",
        senderAddress: process.env.MAIL_ADDRESS,
        senderName: "iEmployee",
        content: {
            subject: subject,
            html: message
        },
        recipients: {
            to: [{
                address: mailAddress,
                displayName: name
            }]
        },
    }
    const pollar = await client.beginSend(Message)
    const response = await pollar.pollUntilDone()

    return response.status

}

const sendTimesheetReport = async (mailAddress, name, subject, message) => {

    const Message = {
        // senderAddress: "DoNotReply@9d6b57e8-bfc5-454b-a5e4-2bcb3d837fa3.azurecomm.net",
        senderAddress: process.env.MAIL_ADDRESS,
        senderName: "iEmployee",
        content: {
            subject: subject,
            html: message
        },
        recipients: {
            to: [{
                address: mailAddress,
                displayName: name
            }]
        },
    }
    const pollar = await client.beginSend(Message)
    const response = await pollar.pollUntilDone()

    return response.status

}

module.exports = { SendMailAzure, SendMailAzureWithSubject, sendNotification, sendTimesheetReport }