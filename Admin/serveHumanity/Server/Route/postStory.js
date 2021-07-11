const express = require("express")
const Story = require('../Schema/postStory')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/story', async (req, res) => {
    const { title, message, selectedFile } = req.body
    try {
        const newStory = new Story({ title, message, selectedFile })
        await newStory.save()
        res.status(200).json(newStory)
    } catch (error) {
        console.log(error)
    }
})

router.get('/story', async (req, res) => {
    try {
        const allStory = await Story.find()
        res.status(200).json(allStory)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/story/:id', async (req, res) => {
    const { id } = req.params
    await Story.findByIdAndRemove(id)
    res.json({ message: "Post deleted successfully." });

})

module.exports = router
