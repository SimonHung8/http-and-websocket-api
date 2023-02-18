const { createClient } = require('redis')
const client = createClient({ url: 'redis://127.0.0.1' });

(async () => {
  client.on('connect', () => console.log('Redis client connected'))

  client.on('error', err => console.error(err))
  await client.connect()
})()

module.exports = client