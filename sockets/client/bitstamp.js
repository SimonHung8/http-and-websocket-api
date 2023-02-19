const WebSocket = require('ws')
const BITSTAMP_URL = 'wss://ws.bitstamp.net'
const CHANNEL_PREFIX = 'live_trades_'
const DEFAULT_CURRENCY_PAIR = [
  'btcusd',
  'btceur',
  'btcgbp',
  'btcpax',
  'gbpusd',
  'gbpeur',
  'eurusd',
  'xrpusd',
  'xrpeur',
  'xrpbtc'
]

module.exports = () => {
  const ws = new WebSocket(BITSTAMP_URL)
  ws.on('open', () => {
    console.log('bitstamp connected')
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
    console.log(JSON.parse(message))
    // handle message from bitstamp
  })
}

