import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { setGlobalState, useGlobalState } from '../store'

const Menu = () => {
  const [menu] = useGlobalState('menu')
  const navigate = useNavigate()

  const navTo = (route) => {
    setGlobalState('menu', 'scale-0')
    navigate(route)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform
      transition-transform duration-300 ${menu}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Account</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => setGlobalState('menu', 'scale-0')}
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          <div className="flex justify-start mt-4">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
                active:shadow-lg transition duration-150 ease-in-out w-full text-left"
              onClick={() => navTo('/orders')}
            >
              Order History
            </button>
          </div>
          
          <div className="flex justify-start mt-4">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
                active:shadow-lg transition duration-150 ease-in-out w-full text-left"
              onClick={() => navTo('/sales')}
            >
              Sales History
            </button>
          </div>

          <div className="flex justify-start mt-4">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
                active:shadow-lg transition duration-150 ease-in-out w-full text-left"
              onClick={() => navTo('/recents')}
            >
              Recent Chats
            </button>
          </div>

          <div className="flex justify-start mt-4">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
                active:shadow-lg transition duration-150 ease-in-out w-full text-left"
            onClick={() => navTo('/seller/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')}
            >
              My Products
            </button>
          </div>

          <div className="flex justify-start mt-4">
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
                active:shadow-lg transition duration-150 ease-in-out w-full text-left"
              onClick={() => navTo('/stats/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')}
            >
              My Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
