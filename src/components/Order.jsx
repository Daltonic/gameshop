import { Link } from 'react-router-dom'
import { FaEthereum } from 'react-icons/fa'
import { cancelOrder, delieverOrder } from '../Blockchain.Service'
import { useGlobalState } from '../store'
import { toast } from 'react-toastify'

const DELEVIRED = 1
const CANCELED = 2

const onDeliver = async (pid, id) => {
  await toast.promise(
    new Promise(async (resolve, reject) => {
      await delieverOrder(pid, id)
        .then(() => resolve())
        .catch(() => reject())
    }),
    {
      pending: 'Approve transaction...',
      success:
        'Order delivered, will reflect in your Order history within 30sec 🙌',
      error: 'Encountered error placing order 🤯',
    },
  )
}

const onCancel = async (pid, id) => {
  await toast.promise(
    new Promise(async (resolve, reject) => {
      await cancelOrder(pid, id)
        .then(() => resolve())
        .catch(() => reject())
    }),
    {
      pending: 'Approve transaction...',
      success:
        'Order delivered, will reflect in your Order history within 30sec 🙌',
      error: 'Encountered error placing order 🤯',
    },
  )
}

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
        {seller
          ? orders.map((order, i) =>
              order.seller == connectedAccount ? (
                <MobileSellerOrder key={i} order={order} i={i} />
              ) : null,
            )
          : orders.map((order, i) =>
              order.buyer == connectedAccount ? (
                <MobileBuyerOrder key={i} order={order} i={i} />
              ) : null,
            )}
      </div>
    </div>
  )
}

const SellerOrder = ({ order, i }) => (
  <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <span className="text-gray-700 font-bold">{i + 1}</span>
    </td>

    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <Link to={'/product/' + order.pid}>
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

    {order.status == DELEVIRED ? (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-green-500">Delievered</span>
      </td>
    ) : order.status == CANCELED ? (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-red-500">Canceled</span>
      </td>
    ) : (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          className="rounded inline-block px-4 py-1.5 bg-green-600 text-white
                font-medium text-xs leading-tight uppercase hover:bg-green-700 
                focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800
                transition duration-150 ease-in-out"
          onClick={() => onDeliver(order.pid, order.id)}
        >
          Deliever
        </button>
      </td>
    )}

    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <small className="flex justify-start items-center space-x-1">
        <FaEthereum />
        <span className="text-gray-700 font-bold">{order.total} EHT</span>
      </small>
    </td>
  </tr>
)

const BuyerOrder = ({ order, i }) => (
  <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <span className="text-gray-700 font-bold">{i + 1}</span>
    </td>

    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <Link to={'/product/' + order.pid}>
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

    {order.status == DELEVIRED ? (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-green-500">Delievered</span>
      </td>
    ) : order.status == CANCELED ? (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="text-red-500">Canceled</span>
      </td>
    ) : (
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          className="rounded inline-block px-4 py-1.5 bg-blue-600 text-white
              font-medium text-xs leading-tight uppercase hover:bg-blue-700 
              focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out"
          onClick={() => onCancel(order.pid, order.id)}
        >
          Cancel
        </button>
      </td>
    )}
    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
      <small className="flex justify-start items-center space-x-1">
        <FaEthereum />
        <span className="text-gray-700 font-bold">{order.total} EHT</span>
      </small>
    </td>
  </tr>
)

const MobileSellerOrder = ({ order, i }) => (
  <div
    className="flex flex-col justify-center items-center  my-4
    transition duration-300 ease-in-out border-b border-gray-200"
  >
    <div className="flex justify-center">
      <span className="text-gray-700 font-bold text-sm">#{i + 1}</span>
    </div>

    <Link
      to={'/product/' + order.pid}
      className="flex flex-col justify-center items-center space-y-2 text-sm font-light"
    >
      <img className="w-1/3 md:w-2/3" src={order.imageURL} alt="game" />
      <small className="font-bold">{order.name}</small>
    </Link>

    <div className="text-sm font-light">
      <small className="flex justify-start items-center space-x-1">
        <FaEthereum />
        <span className="text-gray-700 font-bold">
          {order.qty} x {order.total / order.qty} EHT = {order.total} EHT
        </span>
      </small>
    </div>

    {order.status == DELEVIRED ? (
      <div className="text-sm font-light mt-2 mb-4">
        <span
          className="px-4 py-2 rounded-full text-green-500 bg-green-200 font-semibold
          text-sm flex align-center w-max cursor-pointer active:bg-gray-300
          transition duration-300 ease"
        >
          Delievered
        </span>
      </div>
    ) : order.status == CANCELED ? (
      <div className="text-sm font-light mt-2 mb-4">
        <span
          className="px-4 py-2 rounded-full text-red-500 bg-red-200 font-semibold
          text-sm flex align-center w-max cursor-pointer active:bg-gray-300
          transition duration-300 ease"
        >
          Canceled
        </span>
      </div>
    ) : (
      <div className="text-sm font-light mt-2 mb-4">
        <button
          type="button"
          className="rounded inline-block px-4 py-1.5 bg-green-600 text-white
                font-medium text-xs leading-tight uppercase hover:bg-green-700 
                focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800
                transition duration-150 ease-in-out"
          onClick={() => onDeliver(order.pid, order.id)}
        >
          Deliever
        </button>
      </div>
    )}
  </div>
)

const MobileBuyerOrder = ({ order, i }) => (
  <div
    className="flex flex-col justify-center items-center  my-4
    transition duration-300 ease-in-out border-b border-gray-200"
  >
    <div className="flex justify-center">
      <span className="text-gray-700 font-bold text-sm">#{i + 1}</span>
    </div>

    <Link
      to={'/product/' + order.pid}
      className="flex flex-col justify-center items-center space-y-2 text-sm font-light"
    >
      <img className="w-3/5" src={order.imageURL} alt="game" />
      <small className="font-bold">{order.name}</small>
    </Link>

    <div className="text-sm font-light">
      <small className="flex justify-start items-center space-x-1">
        <FaEthereum />
        <span className="text-gray-700 font-bold">
          {order.qty} x {order.total / order.qty} EHT = {order.total} EHT
        </span>
      </small>
    </div>

    {order.status == DELEVIRED ? (
      <div className="text-sm font-light mt-2 mb-4">
        <span
          className="px-4 py-2 rounded-full text-green-500 bg-green-200 font-semibold
          text-sm flex align-center w-max cursor-pointer active:bg-gray-300
          transition duration-300 ease"
        >
          Delievered
        </span>
      </div>
    ) : order.status == CANCELED ? (
      <div className="text-sm font-light mt-2 mb-4">
        <span
          className="px-4 py-2 rounded-full text-red-500 bg-red-200 font-semibold
          text-sm flex align-center w-max cursor-pointer active:bg-gray-300
          transition duration-300 ease"
        >
          Canceled
        </span>
      </div>
    ) : (
      <div className="text-sm font-light mt-2 mb-4">
        <button
          type="button"
          className="rounded inline-block px-4 py-1.5 bg-green-600 text-white
                font-medium text-xs leading-tight uppercase hover:bg-green-700 
                focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800
                transition duration-150 ease-in-out"
          onClick={() => onCancel(order.pid, order.id)}
        >
          Cancel
        </button>
      </div>
    )}
  </div>
)

export default Order
