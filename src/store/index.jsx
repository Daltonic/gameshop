import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  chatModal: 'scale-0',
  deleteModal: 'scale-0',
  updateModal: 'scale-0',
  modal: 'scale-0',
  menu: 'scale-0',
  connectedAccount: '',
  currentUser: null,
  contract: null,
  stats: null,
  myStats: null,
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
