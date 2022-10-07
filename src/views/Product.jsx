import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadProduct } from '../Blockchain.Service'
import { useGlobalState } from '../store'
import Buyers from '../components/Buyers'
import Details from '../components/Details'

const Product = () => {
  const { id } = useParams()
  const [product] = useGlobalState('product')
  const [buyers] = useGlobalState('buyers')
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await loadProduct(id).then(() => setLoaded(true))
  }, [])

  return loaded ? (
    <>
      <Details product={product} />
      <Buyers buyers={buyers} />
    </>
  ) : null
}

export default Product
