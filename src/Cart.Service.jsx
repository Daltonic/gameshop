import { getGlobalState, setGlobalState } from './store'

const addToCart = (product) => {
  const products = getGlobalState('cart')
  if (!products.find((p) => product.id == p.id)) {
    setGlobalState('cart', [...products, { ...product, qty: 1 }])
    localStorage.setItem(
      'cart',
      JSON.stringify([...products, { ...product, qty: 1 }]),
    )
    summarizeCart()
  }
}

const remFromCart = (product) => {
  let products = getGlobalState('cart')
  products = products.filter((p) => p.id != product.id)
  setGlobalState('cart', products)
  localStorage.setItem('cart', JSON.stringify(products))
  summarizeCart()
}

const updateCart = (product) => {
  const products = getGlobalState('cart')
  products.forEach((p) => {
    if (p.id == product.id) p = product
  })
  setGlobalState('cart', products)
  localStorage.setItem('cart', JSON.stringify(products))
  summarizeCart()
}

const clearCart = () => {
  setGlobalState('cart', [])
  localStorage.removeItem('cart')
  summarizeCart()
}

const summarizeCart = () => {
  const products = getGlobalState('cart')
  const summary = getGlobalState('summary')
  products.forEach((p, i) => {
    summary.total += p.qty * p.price
    if (summary.ids.includes(p.id)) {
      summary.qtys[i] = p.qty
    } else {
      summary.ids[i] = p.id
      summary.qtys[i] = p.qty
    }
  })
  summary.tax = 0.002
  summary.grand = summary.total + summary.tax
  setGlobalState('summary', summary)
  summary.total = 0
  // summary.grand = 0
}

const checkStorage = () => {
  let products = JSON.parse(localStorage.getItem('cart'))
  if (products?.length) {
    setGlobalState('cart', JSON.parse(localStorage.getItem('cart')))
    summarizeCart()
  }
}

export { addToCart, remFromCart, updateCart, checkStorage, clearCart }
