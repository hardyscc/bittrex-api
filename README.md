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

  const respBuy = await bittrex.buy({
    coin: currency,
    quantity: 1,
    rate: 0.01
  })
  console.log('Buy =>', respBuy)

  if (respBuy.success) {
    console.log('Cancel Buy =>', await bittrex.cancel(respBuy.result.uuid))
  }

  const respSell = await bittrex.sell({
    coin: currency,
    quantity: 1,
    rate: 0.1
  })
  console.log('Sell =>', respSell)

  if (respSell.success) {
    console.log('Cancel Sell =>', await bittrex.cancel(respSell.result.uuid))
  }
})()
```
