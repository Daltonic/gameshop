import { useEffect } from "react"
import { loadOrders } from "../Blockchain.Service"
import Order from "../components/Order"

const Orders = () => {
  // const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await loadOrders()
  }, [])

  return (
    <>
      <Order />
    </>
  )
}

export default Orders
