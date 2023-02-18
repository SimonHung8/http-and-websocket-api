const express = require('express')
const routes = require('./routes')
const { errorHandler, undefinedRoutes } = require('./middleware/error-handler')
require('./config/redis')

const app = express()
const port = 3000

app.use(routes)
app.use(errorHandler)
app.use('*', undefinedRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))