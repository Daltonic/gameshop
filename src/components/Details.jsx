import game from '../assets/game.jpg'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'

const Details = () => {
  return (
    <div
      className="flex flex-col lg:flex-row justify-center lg:justify-between 
    items-center lg:space-x-10 md:w-2/3 w-full p-5 mx-auto"
    >
      <img className="w-full lg:w-2/5 mb-5 lg:mb-0" src={game} alt="banner" />
      <div className="flex flex-col justify-between  items-start lg:items-center text-center lg:text-left">
        <div className="flex flex-col space-y-4 mb-5">
          <h4 className="text-3xl font-bold">Web3 Console</h4>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nam
            vero porro, placeat labore explicabo excepturi?
          </p>
          <div className="flex justify-center lg:justify-between space-x-2 items-center">
            <div className="flex justify-start items-center space-x-2">
              <Identicon
                string={'seller'}
                size={25}
                className="h-10 w-10 object-contain rounded-full cursor-pointer"
              />
              <small className="font-bold">0xd1...3ea</small>
            </div>
            <span className="text-sm text-gray-500">6 in stock</span>
          </div>
        </div>
        <div className="flex justify-start text-center items-center flex-wrap space-x-2 mx-auto lg:ml-0">
          <button
            className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out flex justify-start items-center space-x-2"
          >
            <span>Add to Cart</span>
            <div className="flex justify-start items-center">
              <FaEthereum size={15} />
              <span className="font-semibold">2.5</span>
            </div>
          </button>

          <button
            className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white"
          >
            Chat with Seller
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details
