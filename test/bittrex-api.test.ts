import { Bittrex } from '../src/bittrex-api'

/**
 * Bittrex test
 */
describe('Bittrex test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Bittrex is instantiable', () => {
    expect(new Bittrex({})).toBeInstanceOf(Bittrex)
  })
})
