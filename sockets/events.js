const DEFAULT_CURRENCY_PAIR = require('../config/currency-pair.json').currencyPair
const jsonValidator = require('../helper/json-validator')

module.exports = ws => {
  ws.subscription = []
  ws.send(`Welcome! Send 'subscribe' or 'unsubscribe' for currency pair info.${JSON.stringify({
    event: 'subscribe/ unsubscribe',
    data: {
      currencyPair: '[currency pair]'
    }
  })}`)
  ws.on('message', message => {
    const isJSON = jsonValidator(message)
    if (!isJSON) {
      return ws.send('incorrect JSON format')
    }
    const { event, data } = isJSON
    // check whether currency pair in supported list
    const isSupportedCurrency = DEFAULT_CURRENCY_PAIR.some(pair => pair === data.currencyPair)
    if (!isSupportedCurrency) {
      return ws.send('unsupported currency pair')
    }
    // subscribe
    if (event === 'subscribe') {
      const isSubscribed = ws.subscription.some(pair => pair === data.currencyPair)
      if (isSubscribed) {
        return ws.send(`You have already subscribed ${data.currencyPair}`)
      }
      ws.subscription.push(data.currencyPair)
      ws.send('subscription succeeded')
    // unsubscribe
    } else if (event === 'unsubscribe') {
      const index = ws.subscription.indexOf(data.currencyPair)
      if (index < 0) {
        return ws.send(`You haven't subscribed ${data.currencyPair}`)
      }
      ws.subscription.splice(index, 1)
      ws.send('subscription canceled')
    } else {
      ws.send('unknown event')
    }
  })
}