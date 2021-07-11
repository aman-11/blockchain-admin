const mongoose = require('mongoose')

const postStorySchema = new mongoose.Schema({
    title: {
        type: String
    },
    message: {
        type: String
    },
    selectedFile: {
        type: String
    },
    fundRaised: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

module.exports = postStory = mongoose.model("Story", postStorySchema)