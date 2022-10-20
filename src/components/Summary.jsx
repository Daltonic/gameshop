import { FaEthereum } from 'react-icons/fa'
import { useState } from 'react'
import { createOrder } from '../Blockchain.Service'
import { clearCart } from '../Cart.Service'
import { toast } from 'react-toastify'

const Summary = ({ summary }) => {
  const [destination, setDestination] = useState('')
  const [phone, setPhone] = useState('')

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!phone || !destination) return

    const params = { phone, destination, ...summary }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createOrder(params)
          .then(() => {
            onReset()
            clearCart()
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success:
          'Order placed, will reflect in your Order history within 30sec 🙌',
        error: 'Encountered error placing order 🤯',
      },
    )
  }

  const onReset = () => {
    setDestination('')
    setPhone('')
  }

  return (
    <div
      className="flex flex-col md:flex-row justify-center md:justify-between
      items-center flex-wrap space-x-2 md:w-2/3 w-full p-5 mx-auto"
    >
      <form className="w-4/5 md:w-2/5 my-2">
        <div className="mb-3">
          <label className="form-label inline-block mb-2 font-bold text-sm text-gray-700">
            Destination
          </label>

          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
            focus:border-blue-600 focus:outline-none"
            placeholder="Your full address"
            name="destination"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
        </div>

        <div className="mb-3">
          <label className="form-label inline-block mb-2 font-bold text-sm text-gray-700">
            Phone
          </label>

          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
            focus:border-blue-600 focus:outline-none"
            placeholder="Phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>

        <div className="flex justify-between items-center mb-3">
          <button
            className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white w-full"
          >
            Back to Shopping
          </button>
        </div>
      </form>

      <div className="w-4/5 md:w-2/5 my-2">
        <div className="mb-3">
          <h4 className="mb-2 font-bold text-sm text-gray-700">
            Order Summary
          </h4>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700">Subtotal</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700">
              {(summary.grand - summary.tax).toFixed(3)} EHT
            </span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700">Tax</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700">{summary.tax.toFixed(3)} EHT</span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700 font-bold">Grand Total</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700 font-bold">
              {summary.grand.toFixed(3)} EHT
            </span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
          leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
          focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
          active:shadow-lg transition duration-150 ease-in-out w-full"
            onClick={handleCheckout}
          >
            Place Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary
