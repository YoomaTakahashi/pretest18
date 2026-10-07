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

const auth = require('./routes/auth.js')
app.use('/api/auth',auth)

//staff api

const member = require('./routes/Staff/member.js')
app.use('/api/Staff/member',member)

app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{
    console.log("Server Running on Port 3001");
    
})