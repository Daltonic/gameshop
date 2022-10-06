import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isWallectConnected } from './Blockchain.Service'
import { checkStorage } from './Cart.Service'
import Header from './components/Header'
import AddButton from './components/AddButton'
import ShoppingCart from './views/ShoppingCart'
import Home from './views/Home'
import Product from './views/Product'
import Orders from './views/Orders'
import Chat from './views/Chat'
import CreateProduct from './components/CreateProduct'
import Menu from './components/Menu'
import Seller from './views/Seller'
import Recent from './views/Recent'
import Stats from './views/Stats'
import Sales from './views/Sales'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await isWallectConnected().then(() => {
      checkStorage()
      setLoaded(true)
      console.log('Blockchain Loaded')
    })
  }, [])

  return loaded ? (
    <div className="min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="/sales/" element={<Sales />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/recents" element={<Recent />} />
        <Route path="/seller/:id" element={<Seller />} />
        <Route path="/stats/:id" element={<Stats />} />
      </Routes>

      <AddButton />
      <CreateProduct />
      <Menu />
    </div>
  ) : null
}

export default App
