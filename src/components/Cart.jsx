import { FaEthereum } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Cart = ({ cart }) => {
  return (
    <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
      <h4 className="text-center uppercase mb-8">Shopping Cart</h4>

      <table className="min-w-full hidden md:table">
        <thead className="border-b">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              S/N
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Product
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Qty
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Price
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Action
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {cart.map((product, i) => (
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
                <input
                  type="number"
                  className="text-base font-normal text-gray-700
                border border-solid border-gray-300
                rounded transition ease-in-out focus:text-gray-700
                focus:border-blue-600 focus:outline-none w-[80px]"
                  placeholder="Qty"
                  value={product.qty}
                />
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
                >
                  Remove
                </button>
              </td>
              <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                <small className="flex justify-start items-center space-x-1">
                  <FaEthereum />
                  <span className="text-gray-700 font-bold">
                    {product.qty * product.price} EHT
                  </span>
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col justify-center items-center w-full md:hidden">
        {cart.map((product, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center my-4
              border-b border-gray-200 transition duration-300 ease-in-out"
          >
            <Link
              to={'/product/' + i}
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
              <input
                type="number"
                className="text-base font-normal text-gray-700
                border border-solid border-gray-300
                rounded transition ease-in-out focus:text-gray-700
                focus:border-blue-600 focus:outline-none w-[80px]"
                placeholder="Qty"
                value={product.qty}
              />
            </div>

            <div className="text-sm font-light">
              <small className="flex justify-start items-center space-x-1">
                <FaEthereum />
                <span className="text-gray-700 font-bold">
                  {product.price} EHT
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
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
