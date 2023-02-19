const express = require('express')
const WebSocket = require('ws')
const http = require('http')
const routes = require('./routes')
const wsEventHandler = require('./sockets/events')
const { errorHandler, undefinedRoutes } = require('./middleware/error-handler')
// redis setting
require('./config/redis')
// bitstamp WebSocket API connection
const connectBitstamp = require('./sockets/client/bitstamp')

const app = express()
const port = 3000
const server = http.createServer(app)
const wss = new WebSocket.Server({ server, path: '/streaming' })

app.use(routes)
app.use(errorHandler)
app.use('*', undefinedRoutes)

wss.on('connection', ws => {
  wsEventHandler(ws)
})

connectBitstamp(wss)

server.listen(port, () => console.log(`Listening on port ${port}`))