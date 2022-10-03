import { useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { remFromCart, updateCart } from '../Cart.Service'
import Summary from './Summary'

const Cart = ({ cart, summary }) => {
  const [cartItems, setCartItems] = useState([])
  const [process, setProcess] = useState(false)

  const increase = (product) => {
    product.qty++
    updateCart(product)
    setCartItems(cart)
    setProcess(!process)
  }

  const decrease = (product) => {
    if (product.qty == 1) {
      remFromCart(product)
    } else {
      product.qty--
      updateCart(product)
    }
    setCartItems(cart)
    setProcess(!process)
  }

  useEffect(() => {
    setCartItems(cart)
  }, [process])

  return (
    <>
      <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
        <h4 className="text-center uppercase mb-8">Shopping Cart</h4>

        <table className="min-w-full hidden md:table">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                S/N
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Product
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Qty
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Action
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((product, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 transition duration-300 ease-in-out"
              >
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-700 font-bold">{i + 1}</span>
                </td>

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <Link to={'/product/' + product.id}>
                    <img className="w-20" src={product.imageURL} alt="game" />
                    <small className="font-bold">{product.name}</small>
                  </Link>
                </td>

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <div
                    className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                    role="group"
                  >
                    <button
                      type="button"
                      className="rounded-l inline-block px-4 py-1.5 bg-blue-600 text-white font-medium
                      text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none
                      focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                      onClick={() => decrease(product)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className=" inline-block px-4 py-1.5 bg-transparent text-black font-medium
                      text-xs leading-tight uppercase focus:outline-none
                      focus:ring-0 transition duration-150 ease-in-out"
                    >
                      {product.qty}
                    </button>
                    <button
                      type="button"
                      className=" rounded-r inline-block px-4 py-1.5 bg-blue-600 text-white font-medium
                      text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none
                      focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                      onClick={() => increase(product)}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <small className="flex justify-start items-center space-x-1">
                    <FaEthereum />
                    <span className="text-gray-700 font-bold">
                      {product.price} EHT
                    </span>
                  </small>
                </td>

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-transparent text-red-600 font-medium
                text-xs leading-tight uppercase rounded hover:text-red-700
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0
                active:bg-gray-200 transition duration-150 ease-in-out"
                    onClick={() => remFromCart(product)}
                  >
                    Remove
                  </button>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <small className="flex justify-start items-center space-x-1">
                    <FaEthereum />
                    <span className="text-gray-700 font-bold">
                      {(product.qty * product.price).toFixed(3)} EHT
                    </span>
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col justify-center items-center space-y-2 w-full md:hidden">
          {cartItems.map((product, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center my-4 space-y-2
              border-b border-gray-200 transition duration-300 ease-in-out"
            >
              <Link
                to={'/product/' + product.id}
                className="flex flex-col justify-center items-center space-y-2 text-sm font-light"
              >
                <img
                  className="w-1/3 md:w-2/3"
                  src={product.imageURL}
                  alt="game"
                />
                <small className="font-bold">{product.name}</small>
              </Link>

              <div className="flex justify-center">
                <div
                  className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                  role="group"
                >
                  <button
                    type="button"
                    className="rounded-l inline-block px-4 py-1.5 bg-blue-600 text-white font-medium
                      text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none
                      focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    onClick={() => decrease(product)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className=" inline-block px-4 py-1.5 bg-transparent text-black font-medium
                      text-xs leading-tight uppercase focus:outline-none
                      focus:ring-0 transition duration-150 ease-in-out"
                  >
                    {product.qty}
                  </button>
                  <button
                    type="button"
                    className=" rounded-r inline-block px-4 py-1.5 bg-blue-600 text-white font-medium
                      text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none
                      focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    onClick={() => increase(product)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-sm font-light">
                <small className="flex justify-start items-center space-x-1">
                  <FaEthereum />
                  <span className="text-gray-700 font-bold">
                    {(product.qty * product.price).toFixed(3)} EHT
                  </span>
                </small>
              </div>

              <div className="text-sm font-light mb-4">
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-transparent text-red-600 font-medium
                text-xs leading-tight uppercase rounded hover:text-red-700
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0
                active:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => remFromCart(product)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Summary summary={summary} />
    </>
  )
}

export default Cart
