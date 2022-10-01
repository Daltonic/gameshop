import Banner from "../components/Banner"
import ShopStats from "../components/ShopStats"
import Cards from "../components/Cards"
import { useGlobalState } from "../store"

const Home = () => {
  const [products] = useGlobalState('products')

  return (
    <>
      <Banner />
      <ShopStats />
      <div className="h-20"></div>
      <Cards products={products} title="Global Shop" />
    </>
  )
}

export default Home
