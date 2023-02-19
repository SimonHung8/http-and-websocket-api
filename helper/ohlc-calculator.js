module.exports = (ohlcData, currencyPair, price, timestamp) => {
  const index = ohlcData.findIndex(data => data.currencyPair === currencyPair)
  if (index < 0) return
  const target = ohlcData[index]
  const tradeMinute = Math.floor(Number(timestamp) / 60)
  if (tradeMinute === target.minute) {
    target.close = price
    if (price > target.high) {
      target.high = price
    }
    if (price < target.low) {
      target.low = price
    }
  }
  if (tradeMinute > target.minute) {
    target.minute = tradeMinute
    target.open = price
    target.high = price
    target.low = price
    target.close = price
  }
  return target
}