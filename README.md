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
  console.log('Buy =>', await bittrex.buy({ coin: currency, quantity: 1, rate: 0.01 }))
  console.log('Sell =>', await bittrex.sell({ coin: currency, quantity: 1, rate: 0.1 }))
})()
```
