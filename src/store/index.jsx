import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  menu: 'scale-0',
  connectedAccount: '',
  contract: null,
  stats: {balance: 0, product: 0, orders: 0, sellers: 0, sales: 0},
  buyers: [],
  orders: [],
  sales: [],
  products: [],
  product: null,
  cart: [],
  summary: { total: 0, grand: 0, tax: 0, qtys: [], ids: [] },
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export { useGlobalState, setGlobalState, getGlobalState, truncate }
