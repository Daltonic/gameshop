import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './views/Home'

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
