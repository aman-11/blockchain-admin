const sgMail = require('@sendgrid/mail')
const express = require('express')
const router = express.Router();

const API_KEY = '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'

router.post('/sendMail', async (req, res) => {
  const { Emails, campName, amount, to } = req.body
  console.log(Emails, amount, campName, to)
  sgMail.setApiKey(API_KEY)
  const message = {
    to: Emails,
    from: "aayushaman15@gmail.com",
    //subject: `Acknowledgement mail for ${campName}`,
    // html:`<h5>we have transfered your Rs. ${amount} money which was succesfully collected for the ${campName} in the name of the recipient ${recipient}.</h5>`
    templateId: 'd-87a7b0a0b153453881681a2e4aa3b1e8',
    dynamic_template_data: {
      subject: 'Acknowledgement for the Campaign Transcation',
      campName: campName,
      amount: amount,
      recipient: to,
    },
  }

  sgMail.send(message)
    .then((res) => {
      console.log('email send successfull')
    })
    .catch((err) => console.log(err))

})

module.exports = router