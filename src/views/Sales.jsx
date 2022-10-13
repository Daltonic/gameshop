import { useEffect } from "react"
import { loadOrders } from "../Blockchain.Service"
import { useGlobalState } from "../store"
import Order from "../components/Order"

const Sales = () => {
  const [orders] = useGlobalState('orders')

  useEffect(async () => {
    await loadOrders()
  }, [])

  return (
    <>
      <Order orders={orders} title={'Sales'} seller />
    </>
  )
}

export default Sales
