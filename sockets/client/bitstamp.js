const WebSocket = require('ws')
const BITSTAMP_URL = 'wss://ws.bitstamp.net'
const CHANNEL_PREFIX = 'live_trades_'
const DEFAULT_CURRENCY_PAIR = require('../../config/currency-pair.json').currencyPair

module.exports = wss => {
  const ws = new WebSocket(BITSTAMP_URL)
  ws.on('open', () => {
    console.log('Bitstamp connected')
    DEFAULT_CURRENCY_PAIR.forEach(pair => {
      ws.send(JSON.stringify({
        event: "bts:subscribe",
        data: {
          channel: `${CHANNEL_PREFIX}${pair}`
        }
      }))
    })
  })

  ws.on('message', message => {
    const { event, data, channel } = JSON.parse(message)
    if (event === 'trade') {
      const currencyPair = channel.replace(CHANNEL_PREFIX, '')
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.subscription.some(sub => sub === currencyPair)) {
          client.send(JSON.stringify({
            currencyPair,
            price: data.price
          }))
        }
      })
    }
  })
}

