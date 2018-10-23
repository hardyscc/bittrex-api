# Bittrex Javascript API

## Sample Usage

```javascript
import Bittrex from '@hardyscc/bittrex-api'

const bittrex = new Bittrex({
  apikey: 'key',
  apisecret: 'secret'
})
;(async () => {
  const currency = 'ETH'

  console.log('Balance =>', await bittrex.getBalance(currency))

  console.log('Market Summary =>', await bittrex.getMarketSummary(currency))

  const {
    result: { buy, sell }
  } = await bittrex.getOrderBook(currency)
  console.log('Order Book Bid =>', buy)
  console.log('Order Book Ask =>', sell)

  console.log('Open Orders =>', await bittrex.getOpenOrders(currency))

  const resp = await bittrex.buy({
    coin: currency,
    quantity: 1,
    rate: 0.01
  })
  console.log('Buy =>', resp)

  if (resp.success) {
    console.log('Cancel Buy =>', await bittrex.cancel(resp.result.uuid))
  }

  const resp = await bittrex.sell({
    coin: currency,
    quantity: 1,
    rate: 0.1
  })
  console.log('Sell =>', resp)

  if (resp.success) {
    console.log('Cancel Sell =>', await bittrex.cancel(resp.result.uuid))
  }
})()
```
