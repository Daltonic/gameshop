import { Link } from 'react-router-dom'
import { FaEthereum } from 'react-icons/fa'
import { cancelOrder, delieverOrder } from '../Blockchain.Service'
import { useGlobalState } from '../store'

const Order = ({ orders, title, seller }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
      <h4 className="text-center uppercase mb-8">{title}</h4>

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
              Status
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {seller
            ? orders.map((order, i) =>
                order.seller == connectedAccount ? (
                  <SellerOrder key={i} order={order} i={i} />
                ) : null,
              )
            : orders.map((order, i) =>
                order.buyer == connectedAccount ? (
                  <BuyerOrder key={i} order={order} i={i} />
                ) : null,
              )}
        </tbody>
      </table>

      <div className="flex flex-col justify-center items-center w-full md:hidden">
        {orders.map((order, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center  my-4
              transition duration-300 ease-in-out border-b border-gray-200"
          >
            <div className="flex justify-center">
              <span className="text-gray-700 font-bold text-sm">#{i + 1}</span>
            </div>

            <Link
              to={'/product/' + order.id}
              className="flex flex-col justify-center items-center space-y-2 text-sm font-light"
            >
              <img className="w-1/3 md:w-2/3" src={order.imageURL} alt="game" />
              <small className="font-bold">{order.name}</small>
            </Link>

            <div className="text-sm font-light">
              <small className="flex justify-start items-center space-x-1">
                <FaEthereum />
                <span className="text-gray-700 font-bold">
                  {order.qty} x {order.total / order.qty} EHT = {order.total}{' '}
                  EHT
                </span>
              </small>
            </div>

            <div className="text-sm font-light mt-2 mb-4">
              <span
                className="px-4 py-2 rounded-full text-green-500 bg-green-200 font-semibold
                    text-sm flex align-center w-max cursor-pointer active:bg-gray-300
                    transition duration-300 ease"
              >
                Delievered
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-5">
        <button
          className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
          leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
        focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
          active:shadow-lg transition duration-150 ease-in-out"
        >
          Load More
        </button>
      </div>
    </div>
  )
}

const SellerOrder = ({ order, i }) => {
  const DELEVIRED = 1

  return (
    <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700 font-bold">{i + 1}</span>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Link to={'/product/' + order.id}>
          <img className="w-20" src={order.imageURL} alt="game" />
          <small className="font-bold">{order.name}</small>
        </Link>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700 font-bold">{order.qty}</span>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <small className="flex justify-start items-center space-x-1">
          <FaEthereum />
          <span className="text-gray-700 font-bold">
            {(order.total / order.qty).toFixed(3)} EHT
          </span>
        </small>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        {order.status == DELEVIRED ? (
          <span className="text-green-500">Delievered</span>
        ) : (
          <button
            type="button"
            className="rounded inline-block px-4 py-1.5 bg-green-600 text-white
                font-medium text-xs leading-tight uppercase hover:bg-green-700 
                focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800
                transition duration-150 ease-in-out"
            onClick={() => delieverOrder(order.pid, order.id)}
          >
            Deliever
          </button>
        )}
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <small className="flex justify-start items-center space-x-1">
          <FaEthereum />
          <span className="text-gray-700 font-bold">{order.total} EHT</span>
        </small>
      </td>
    </tr>
  )
}

const BuyerOrder = ({ order, i }) => {
  const CANCELED = 2

  return (
    <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700 font-bold">{i + 1}</span>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Link to={'/product/' + order.id}>
          <img className="w-20" src={order.imageURL} alt="game" />
          <small className="font-bold">{order.name}</small>
        </Link>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700 font-bold">{order.qty}</span>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <small className="flex justify-start items-center space-x-1">
          <FaEthereum />
          <span className="text-gray-700 font-bold">
            {(order.total / order.qty).toFixed(3)} EHT
          </span>
        </small>
      </td>

      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        {order.status == CANCELED ? (
          <span className="text-red-500">Canceled</span>
        ) : (
          <button
            type="button"
            className="rounded inline-block px-4 py-1.5 bg-blue-600 text-white
              font-medium text-xs leading-tight uppercase hover:bg-blue-700 
              focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out"
            onClick={() => cancelOrder(order.pid, order.id)}
          >
            Cancel
          </button>
        )}
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <small className="flex justify-start items-center space-x-1">
          <FaEthereum />
          <span className="text-gray-700 font-bold">{order.total} EHT</span>
        </small>
      </td>
    </tr>
  )
}

export default Order
