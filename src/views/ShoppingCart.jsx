import Cart from '../components/Cart'
import Summary from '../components/Summary'
import { useGlobalState } from '../store'

const ShoppingCart = () => {
  const [cart] = useGlobalState('cart')
  return (
    <>
      <div className="h-10"></div>
      {cart.length > 0 ? (
        <>
          <Cart cart={cart} />
          <Summary />
        </>
      ) : (
        <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
          <h4 className="text-center uppercase mb-8">Cart Empty</h4>
          <p>Add some products to your cart...</p>
        </div>
      )}
    </>
  )
}

export default ShoppingCart
