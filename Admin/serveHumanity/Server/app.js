const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const { URL } = require('./Key')
const Auth = require('./Route/Auth')
const Request = require('./Route/Request.js')
const PostStory = require('./Route/postStory')
const SendMail = require('./Route/sendEmail')
const app = express()
const dotenv = require('dotenv');

dotenv.config()
const PORT = 8080 ////************** */
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(app.listen(PORT, () => {
    console.log("server Started", PORT)
}))

mongoose.connection.on("connected", () => {
    console.log("connected")
})

//middleware
app.use(express.json())

app.use(cors());
app.use(Auth)
app.use(Request)
app.use(PostStory)
app.use(SendMail)
mongoose.set('useFindAndModify', false);