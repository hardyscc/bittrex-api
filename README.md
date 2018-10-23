# Bittrex Javascript API

## Sample

```javascript
import Bittrex from '@hardyscc/bittrex-api'

const bittrex = new Bittrex({
  apikey: 'key',
  apisecret: 'secret'
})
;(async () => {
  const currency = 'DCR'
  console.log('Balance =>', await bittrex.getBalance(currency))
  console.log('Market Summary =>', await bittrex.getMarketSummary(currency))
  const {
    result: { buy, sell }
  } = await bittrex.getOrderBook(currency)
  console.log('Order Book Buy =>', buy)
  console.log('Order Book Sell =>', sell)
  console.log('Open Orders =>', await bittrex.getOpenOrders(currency))
})()
```
