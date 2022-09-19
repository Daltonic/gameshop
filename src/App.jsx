import Banner from "./components/Banner"
import Cards from "./components/Cards"
import Header from "./components/Header"

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Banner />
      <div className="h-20"></div>
      <Cards />
    </div>
  )
}

export default App
