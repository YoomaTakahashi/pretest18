const express = require('express')
const cors = require('cors')

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`)
})
