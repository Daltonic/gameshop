import { getGlobalState, setGlobalState } from "./store"

const addToCart = (product) => {
  const products = getGlobalState('cart')
  if (!products.includes(product)) {
    setGlobalState('cart', [...products, { ...product, qty: 1 }])
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

export { addToCart, remFromCart, updateCart }
