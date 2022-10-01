import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isWallectConnected, loadProduct } from '../BlockchainService'
import Buyers from '../components/Buyers'
import Details from '../components/Details'
import { useGlobalState } from '../store'

const Product = () => {
  const { id } = useParams()
  const [product] = useGlobalState('product')
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected().then(() => console.log('Blockchain Loaded'))
    await loadProduct(id).then(() => setLoaded(true))
  }, [])
  
  return loaded ? (
    <>
      <Details product={product} />
      <Buyers />
    </>
  ) : null
}

export default Product
