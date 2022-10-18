import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isWallectConnected } from './Blockchain.Service'
import { ToastContainer } from 'react-toastify'
import { checkStorage } from './Cart.Service'
import Header from './components/Header'
import AddButton from './components/AddButton'
import CreateProduct from './components/CreateProduct'
import UpateProduct from './components/UpateProduct'
import Menu from './components/Menu'
import Home from './views/Home'
import Product from './views/Product'
import Orders from './views/Orders'
import Chat from './views/Chat'
import Seller from './views/Seller'
import Recent from './views/Recent'
import Stats from './views/Stats'
import Sales from './views/Sales'
import ShoppingCart from './views/ShoppingCart'
import DeleteProduct from './components/DeleteProduct'
import ChatModal from './components/ChatModal'
import { isUserLoggedIn } from './Chat.Service'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected().then(async () => {
      checkStorage()
      await isUserLoggedIn()
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
      <UpateProduct />
      <DeleteProduct />
      <Menu />
      <ChatModal />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  ) : null
}

export default App
