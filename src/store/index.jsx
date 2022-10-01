import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  menu: 'scale-0',
  connectedAccount: '',
  contract: null,
  stats: null,
  products: [],
  product: null,
  cart: [],
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

const addToCart = (product) => {
  const products = getGlobalState('cart')
  if (!products.includes(product)) {
    setGlobalState('cart', [...products, {...product, qty: 1}])
  }
}

const remFromCart = (id) => {
  let products = getGlobalState('cart')
  products = products.filter((product) => product.id != id)
  setGlobalState('cart', products)
}

const updateCart = (product) => {
  const products = getGlobalState('cart')
  products.forEach((p) => {
    if (p.id == product.id) p = product
  })
  setGlobalState('cart', products)
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  addToCart,
  remFromCart,
  updateCart,
}
