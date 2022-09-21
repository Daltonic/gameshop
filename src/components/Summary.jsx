import { FaEthereum } from 'react-icons/fa'

const Summary = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between
      items-center flex-wrap space-x-2 md:w-2/3 w-full p-5 mx-auto">
      <div className="w-4/5 md:w-2/5 my-2">
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
            placeholder="Country"
          />
        </div>

        <div className="mb-3">
          <label className="form-label inline-block mb-2 font-bold text-sm text-gray-700">
            Province
          </label>

          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
            focus:border-blue-600 focus:outline-none"
            placeholder="State"
          />
        </div>

        <div className="mb-3">
          <label className="form-label inline-block mb-2 font-bold text-sm text-gray-700">
            Address
          </label>

          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
            focus:border-blue-600 focus:outline-none"
            placeholder="Street Address"
          />
        </div>
      </div>

      <div className="w-4/5 md:w-2/5 my-2">
        <div className="mb-3">
          <h4 className="mb-2 font-bold text-sm text-gray-700">Order Summary</h4>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700">Subtotal</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700">0.34 EHT</span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700">Tax</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700">0.002 EHT</span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="mb-2 text-sm text-gray-700 font-bold">Grand Total</h4>

          <small className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span className="text-gray-700 font-bold">0.342 EHT</span>
          </small>
        </div>

        <div className="flex justify-between items-center mb-3">
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
          leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
          focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
          active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="flex justify-between items-center mb-3">
        <button
            className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white w-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary
