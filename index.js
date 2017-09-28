const PORT = process.env.PORT || 9090
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/results', (req, res) => {
  return res.sendFile(__dirname + '/results.json')
})

app.post('/results', (req, res) => {
  console.log(req.body)
  fs.writeFileSync('results.json', JSON.stringify(req.body))
  return res.json(req.body)
})

app.use(express.static(__dirname + '/client/build'))


app.listen(PORT, (server) => {
  console.log(JSON.stringify({
    event: 'ServerStarted',
    message: `Listening on port ${PORT}`,
  }))
})
