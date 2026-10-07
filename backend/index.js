require('dotenv').config({path:'.env'})
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const fileUp =require('express-fileupload')

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))

app.use(fileUp())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const profile = require('./routes/profile.js')
app.use('/api/profile',profile)

const auth = require('./routes/auth')
app.use('/api/auth',auth)

//staff api

const member = require('./routes/Staff/member.js')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate.js')
app.use('/api/Staff/indicate',indicate)

const system = require('./routes/Staff/system.js')
app.use('/api/Staff/system',system)

const eva = require('./routes/Staff/eva.js')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit.js')
app.use('/api/Staff/commit',commit)

const doc = require('./routes/Staff/doc.js')
app.use('/api/Staff/doc',doc)
//api eva

const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{
    console.log("Server Running on Port 3001");
    
})