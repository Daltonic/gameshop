import { Route, Routes } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
import { isWallectConnected } from './BlockchainService'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await isWallectConnected().then(() => {
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
