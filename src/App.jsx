import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AddButton from './components/AddButton'
import ShoppingCart from './views/ShoppingCart'
import Home from './views/Home'
import Product from './views/Product'
import Orders from './views/Orders'
import Chat from './views/Chat'

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
      <AddButton />
    </div>
  )
}

export default App
