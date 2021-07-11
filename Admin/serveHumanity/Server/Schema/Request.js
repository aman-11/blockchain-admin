const mongoose = require('mongoose')

const requestScheme = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    result: {
        type: String,
        
    }
},
    {
        timestamps: true
    }
);
module.exports = Request = mongoose.model("Request", requestScheme)
