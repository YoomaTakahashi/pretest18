const express = require('express')
const cors = require('cors')

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

<<<<<<< HEAD
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`)
})
=======
const auth = require('./routes/auth')
app.use('/api/auth',auth)

const docnoe = require('./routes/docnoe')
app.use('/api/docnoe',docnoe)

//api eva

const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

app.use((req,res)=> res.status(404).json({message:'Route not found'}))
app.listen(3001,()=>{
    console.log("Server Running on Port 3001");
    
})
>>>>>>> eb7d3b9f9957920c4eeaefa64d07c52bd5239820
