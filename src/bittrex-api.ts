// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import crypto from 'crypto'
import axios from 'axios'
import querystring from 'querystring'

interface BuySell {
  coin: string
  quantity: number
  rate: number
}

export default class Bittrex {
  key: string
  secret: string
  uri: URL

  constructor({ uri = 'https://bittrex.com', apikey = '', apisecret = '' }) {
    this.key = apikey
    this.secret = apisecret
    this.uri = new URL(uri)
    return this
  }

  sign(uri: string): string {
    return crypto
      .createHmac('sha512', this.secret)
      .update(uri)
      .digest('hex')
  }

  async request(options: { [key: string]: any }) {
    let uri = this.uri.toString()
    if (options) {
      const q = querystring.stringify(options)
      uri += `?${q}`
    }

    const { data } = await axios.get(uri, {
      headers: { apisign: this.sign(uri) },
      responseType: 'json'
    })
    return data
  }

  async getBalance(currency = 'ETH') {
    this.uri.pathname = '/api/v1.1/account/getbalance'
    const options = {
      currency,
      apikey: this.key,
      nonce: new Date().getTime()
    }
    return this.request(options)
  }

  // Used to place a buy order in a specific market.
  async buy({ coin, quantity, rate }: BuySell) {
    this.uri.pathname = '/api/v1.1/market/buylimit'
    const options = {
      market: `BTC-${coin}`,
      quantity,
      rate,
      apikey: this.key,
      nonce: new Date().getTime()
    }
    return this.request(options)
  }

  // Used to place an sell order in a specific market
  async sell({ coin, quantity, rate }: BuySell) {
    this.uri.pathname = '/api/v1.1/market/selllimit'
    const options = {
      market: `BTC-${coin}`,
      quantity,
      rate,
      apikey: this.key,
      nonce: new Date().getTime()
    }
    return this.request(options)
  }

  async cancel(uuid: string) {
    this.uri.pathname = '/api/v1.1/market/cancel'
    const options = {
      uuid,
      apikey: this.key,
      nonce: new Date().getTime()
    }
    return this.request(options)
  }

  async getMarketSummary(currency = 'ETH') {
    this.uri.pathname = '/api/v1.1/public/getmarketsummary'
    const market = `BTC-${currency}`
    return this.request({ market })
  }

  async getOrderBook(currency = 'ETH', type = 'both') {
    this.uri.pathname = '/api/v1.1/public/getorderbook'
    const options = {
      market: `BTC-${currency}`,
      type
    }
    return this.request(options)
  }

  async getOpenOrders(currency = 'ETH') {
    this.uri.pathname = '/api/v1.1/market/getopenorders'
    const options = {
      market: `BTC-${currency}`,
      apikey: this.key,
      nonce: new Date().getTime()
    }
    return this.request(options)
  }
}
