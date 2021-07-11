const express = require('express')
const Admin = require('../Schema/Admin')
const bcrypt = require('bcrypt')
const router = express.Router();
const mongoose = require ('mongoose')
const  jwt = require('jsonwebtoken')
//signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const checkUser = await Admin.findOne({ email })
    console.log(req.body);

    try {
        if (checkUser)
            return res.status(422).json({ message: "already exist! Move to Login" })
    
        const hashedPass = await bcrypt.hash(password, 10)
        const result = await Admin.create({ email, password: hashedPass })
        
        res.status(200).json({messsage: "Created",result})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in sign up" });
        console.log(error);
    }
    
})

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const existingAdmin = await Admin.findOne({ email });

    try {
        if (!existingAdmin)
        res.status(400).json({ message: "Admin dosent exists" })
            
        const isPassCorrect = await bcrypt.compare(password, existingAdmin.password)
        if (!isPassCorrect)
            res.status(400).json({message: "invalid credential"})
        
        const token = jwt.sign({ _id: existingAdmin._id }, "admin", { expiresIn: "1h" })

        res.status(200).json({result: token})
    
    } catch (error) {
        console.log("error in login")
    }
    
})

module.exports = router