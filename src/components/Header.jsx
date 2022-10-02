import Identicon from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { setGlobalState, truncate, useGlobalState } from '../store'
import { connectWallet } from '../Blockchain.Service'

const Header = () => {
  const navigate = useNavigate()
  const [cart] = useGlobalState('cart')
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="flex justify-between items-center shadow-sm shadow-gray-200 p-5">
      <Link
        to="/"
        className="flex justify-start items-center space-x-1 text-md font-bold"
      >
        <FaEthereum className="cursor-pointer" size={25} />
        <span>GameShop</span>
      </Link>

      <div className="flex justify-end items-center space-x-6">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => navigate('/cart')}
            className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex 
            align-center cursor-pointer active:bg-gray-300 transition duration-300 
            ease w-max py-1 px-2"
          >
            <AiOutlineShoppingCart className="cursor-pointer" size={25} />
            <span
              className="rounded-full py-[2px] px-[10px] text-center font-bold
            bg-red-600 text-white ml-2"
            >
              {cart.length}
            </span>
          </button>

          <button
            onClick={() => setGlobalState('menu', 'scale-100')}
            className="bg-transparent shadow-sm shadow-gray-400 rounded-full"
          >
            <Identicon
              string={connectedAccount}
              size={25}
              className="h-10 w-10 object-contain rounded-full cursor-pointer"
            />
          </button>
        </div>
        {connectedAccount ? (
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out"
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
