import { useEffect } from "react"
import { loadOrders } from "../Blockchain.Service"
import { useGlobalState } from "../store"
import Order from "../components/Order"

const Orders = () => {
  const [orders] = useGlobalState('orders')
  useEffect(async () => {
    await loadOrders()
  }, [])

  return (
    <>
      <Order orders={orders} title="Orders" />
    </>
  )
}

export default Orders
