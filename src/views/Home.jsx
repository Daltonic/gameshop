import Banner from '../components/Banner'
import ShopStats from '../components/ShopStats'
import Cards from '../components/Cards'
import { useGlobalState } from '../store'
import { isWallectConnected, loadProducts } from '../BlockchainService'
import { useEffect, useState } from 'react'

const Home = () => {
  const [products] = useGlobalState('products')
  const [stats] = useGlobalState('stats')
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected().then(() => console.log('Blockchain Loaded'))
    await loadProducts().then(() => setLoaded(true))
  }, [])

  return loaded ? (
    <>
      <Banner />
      <ShopStats stats={stats} />
      <div className="h-20"></div>
      <Cards products={products} title="Global Shop" />
    </>
  ) : null
}

export default Home
