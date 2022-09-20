import Banner from "../components/Banner"
import ShopStats from "../components/ShopStats"
import Cards from "../components/Cards"

const Home = () => {
  return (
    <>
      <Banner />
      <ShopStats />
      <div className="h-20"></div>
      <Cards />
    </>
  )
}

export default Home
