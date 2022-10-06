import { useEffect } from "react"
import { loadOrders } from "../Blockchain.Service"
import { useGlobalState } from "../store"
import Order from "../components/Order"

const Sales = () => {
  const [sales] = useGlobalState('sales')

  useEffect(async () => {
    await loadOrders()
  }, [])

  return (
    <>
      <Order orders={sales} title={'Sales'} />
    </>
  )
}

export default Sales
