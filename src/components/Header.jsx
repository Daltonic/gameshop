import Identicon from 'react-identicons'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
  return (
    <div className="flex justify-between items-center shadow-sm shadow-gray-200 p-5">
      <h4 className="text-md font-bold">GameShop</h4>
      
      <div className="flex justify-end items-center space-x-6">
        <div className="flex justify-center items-center space-x-4">
          <span
            class="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex 
            align-center cursor-pointer active:bg-gray-300 transition duration-300 
            ease w-max py-1 px-2">
            <AiOutlineShoppingCart
              className="cursor-pointer"
              size={25}
            />
            <span class="rounded-full py-[2px] px-[10px] text-center font-bold
            bg-red-600 text-white ml-2">7</span>
          </span>

          <Identicon
            string={'account'}
            size={25}
            className="h-10 w-10 object-contain rounded-full cursor-pointer"
          />
        </div>

        <button className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
          leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
          focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
          active:shadow-lg transition duration-150 ease-in-out"
        >
         Connect
        </button>
      </div>
    </div>
  )
}

export default Header