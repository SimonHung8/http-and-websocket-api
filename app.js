const express = require('express')
const WebSocket = require('ws')
const http = require('http')
const routes = require('./routes')
const { errorHandler, undefinedRoutes } = require('./middleware/error-handler')
require('./config/redis')

const app = express()
const port = 3000
const server = http.createServer(app)
const wss = new WebSocket.Server({ server, path: '/streaming' })

app.use(routes)
app.use(errorHandler)
app.use('*', undefinedRoutes)

wss.on('connection', ws => {
  console.log('WebSocket connected')
  ws.send('Welcome')
  ws.on('close', () => console.log('connection closed'))
})

server.listen(port, () => console.log(`Listening on port ${port}`))