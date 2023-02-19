const WebSocket = require('ws')
const BITSTAMP_URL = 'wss://ws.bitstamp.net'
const CHANNEL_PREFIX = 'live_trades_'
const DEFAULT_CURRENCY_PAIR = require('../../config/currency-pair.json').currencyPair
const ohlcCalculator = require('../../helper/ohlc-calculator')
const ohlcData = DEFAULT_CURRENCY_PAIR.map(currencyPair => ({
  currencyPair,
  minute: 0,
  open: 0,
  high: 0,
  low: 0,
  close: 0
}))

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
      const { price, timestamp } = data
      const { open, high, low, close } = ohlcCalculator(ohlcData, currencyPair, price, timestamp)
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.subscription.some(sub => sub === currencyPair)) {
          client.send(JSON.stringify({
            currencyPair,
            price,
            open,
            high,
            low,
            close
          }))
        }
      })
    }
  })
}

