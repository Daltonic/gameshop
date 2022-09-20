import game from '../assets/game.jpg'
import { FaEthereum } from 'react-icons/fa'

const Cart = () => {
  return (
    <div className="flex flex-col justify-center items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
      <table className="min-w-full hidden md:table">
        <thead className="border-b">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Product
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Qty
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
          <tr className="border-b border-gray-200 transition duration-300 ease-in-out">
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
              <img className="w-20" src={game} alt="game" />
              <small className="font-bold">Virtual Land</small>
            </td>
            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
              <input
                type="number"
                class="text-base font-normal text-gray-700
                border border-solid border-gray-300
                rounded transition ease-in-out focus:text-gray-700
                focus:border-blue-600 focus:outline-none w-[80px]"
                placeholder="Qty"
              />
            </td>

            <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-transparent text-red-600 font-medium
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
                <span className="text-gray-700 font-bold">0.34 EHT</span>
              </small>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-col justify-center items-center w-full md:hidden">
        <div className="flex flex-col justify-center items-center border-gray-200 transition duration-300 ease-in-out">
          <div className="flex flex-col justify-center items-center space-y-2 text-sm font-light">
            <img className="w-1/3 md:w-2/3" src={game} alt="game" />
            <small className="font-bold">Virtual Land</small>
          </div>

          <div class="flex justify-center">
            <input
              type="number"
              class="text-base font-normal text-gray-700
                border border-solid border-gray-300
                rounded transition ease-in-out focus:text-gray-700
                focus:border-blue-600 focus:outline-none w-[80px]"
              placeholder="Qty"
            />
          </div>

          <div className="text-sm font-light">
            <small className="flex justify-start items-center space-x-1">
              <FaEthereum />
              <span className="text-gray-700 font-bold">0.34 EHT</span>
            </small>
          </div>

          <div className="text-sm font-light">
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-transparent text-red-600 font-medium
                text-xs leading-tight uppercase rounded hover:text-red-700
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0
                active:bg-gray-200 transition duration-150 ease-in-out"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
