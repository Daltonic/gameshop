import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

const Seller = () => {
  const { id } = useParams()

  return (
    <>
      <div className="h-20"></div>
      <Cards products={[]} title="Seller Shop" seller={id} />
    </>
  )
}

export default Seller
