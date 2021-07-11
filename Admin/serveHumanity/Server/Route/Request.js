const express = require('express')
const Request = require('../Schema/Request')
const router = express.Router();
const mongoose = require('mongoose')
router.post('/request', async (req, res) => {
    const { username, email, phone, organization } = req.body
    const result = null
    try {
        await Request.create({ username, email, phone, organization, result })
        res.status(200).json({ message: "request send" })
    } catch (error) {
        console.log("error in sending request")
    }
})

router.get('/request', async (req, res) => {
    try {
        const requests = await Request.find()
        res.status(200).json(requests)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/perform', async (req, res) => {

    const { email, decision } = req.body
    try {
        await Request.findOneAndUpdate({ "email" : email }, { $set: { result: decision } }, { new: true });
        res.json({ message: "done" })
    } catch (error) {
        console.log("wht")
    }
})  


module.exports = router