const express = require('express')
const router = express.Router()
const { SendMailAzureWithSubject } = require('./MailSender');

router.post('/send-mail', async (req, res) => {

    const { toMail, toSubject, toMessage } = req.body

    let mailaddress = [{
        address: toMail,
        displayName: ""
    }]

    let result = await SendMailAzureWithSubject(mailaddress, toSubject, toMessage)

    if (result === 'Succeeded') {
        res.json({ isSuccess: true, message: "Successfully sent" })
    }
    else {
        res.json({ isSuccess: false })
    }

})

module.exports = router