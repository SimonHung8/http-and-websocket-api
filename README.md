# Pretest


## Environment Setup
Please install Node.js, npm and redis before starting.

## How to Use

1. Clone the project to local side
2. Access the project directory through terminal and install packages

   ```bash
   npm install
   ```

3. To start server:

   ```bash
   npm run start
   ```

4. You'll see below messages in console

   ```bash
   Listening on port 3000
   Redis client connected
   Bitstamp connected
   ```

5. Now server is accessible on the following address:
   * HTTP API: http://localhost:3000/data?user=id
   * WebSocket API: ws://localhost:3000/streaming

6. To stop the server:

   ```bash
   ctrl + c
   ```

## HTTP API
Note: user id should be integer between 1 ~ 1000

## WebSocket API

### Subscription JSON structure:
To subscribe or unsubscribe live ticker info, JSON message should be sent to server:
```bash
{
  "event": "subscribe / unsubscribe",
  "data": {
    "currencyPair": "[currency pair]"
  }
}
```
### Live ticker JSON structure:
```bash
{
  "currencyPair": "[subscribed currency pair]",
  "price": "[trade price]",
  "open": "[1min OHLC-open]",
  "high": "[1min OHLC-high]",
  "low": "[1min OHLC-low]",
  "close": "[1min OHLC-close]",
}
```
### Supported currency pairs:
btcusd, btceur, btcgbp, btcpax, gbpusd, gbpeur, eurusd, xrpusd, xrpeur, xrpbtc,
