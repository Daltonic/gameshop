import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ShoppingCart from './views/ShoppingCart'
import Home from './views/Home'
import Product from './views/Product'

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
