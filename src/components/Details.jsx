import Identicon from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import { setGlobalState, truncate, useGlobalState } from '../store'
import { addToCart } from '../Cart.Service'
import { useEffect, useState } from 'react'
import { getUser } from '../Chat.Service'
import { toast } from 'react-toastify'

const Details = ({ product }) => {
  const navigate = useNavigate()
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [currentUser] = useGlobalState('currentUser')
  const [seller, setSeller] = useState(false)

  const handleChat = () => {
    if (currentUser) {
      if (seller) {
        navigate('/chat/' + product.seller)
      } else {
        toast('Seller not registered for chat yet!')
      }
    } else {
      setGlobalState('chatModal', 'scale-100')
    }
  }

  const handleEdit = () => {
    setGlobalState('product', product)
    setGlobalState('updateModal', 'scale-100')
  }

  const handleDelete = () => {
    setGlobalState('product', product)
    setGlobalState('deleteModal', 'scale-100')
  }

  useEffect(async () => {
    await getUser(product.seller).then((user) => {
      if (user.name) setSeller(user.uid == product.seller)
    })
  }, [])

  return (
    <div
      className="flex flex-col lg:flex-row justify-center lg:justify-between 
      items-center lg:space-x-10 md:w-2/3 w-full p-5 mx-auto"
    >
      <img
        className="h-56 w-56 object-cover mb-5 lg:mb-0"
        src={product.imageURL}
        alt={product.name}
      />
      <div className="flex flex-col justify-between  items-start lg:items-center text-center lg:text-left">
        <div className="flex flex-col space-y-4 mb-5">
          <h4 className="text-3xl font-bold">{product.name}</h4>
          <p className="text-gray-500">{product.description}</p>

          <div className="flex justify-center lg:justify-between space-x-2 items-center">
            <Link
              to={'/seller/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
              className="flex justify-start items-center space-x-2"
            >
              <Identicon
                string={product.seller}
                size={25}
                className="h-10 w-10 object-contain rounded-full cursor-pointer"
              />
              <small className="font-bold">
                {truncate(product.seller, 4, 4, 11)}
              </small>
            </Link>

            <span className="text-sm text-gray-500">
              {product.stock} in stock
            </span>
          </div>
        </div>

        <div className="flex justify-start text-center items-center flex-wrap space-x-1 mx-auto lg:ml-0">
          {product.deleted ? null : connectedAccount == product.seller ? (
            <div className="flex justify-start text-center items-center space-x-1">
              <button
                className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
                  leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
                  focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
                  active:shadow-lg transition duration-150 ease-in-out flex justify-start items-center space-x-2"
                onClick={handleEdit}
              >
                <span>Edit Product</span>
              </button>

              <button
                className="px-6 py-2.5 bg-red-800 text-white font-medium text-xs 
                  leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg
                  focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 
                  active:shadow-lg transition duration-150 ease-in-out flex justify-start items-center space-x-2"
                onClick={handleDelete}
              >
                <span>Delete Product</span>
              </button>
            </div>
          ) : (
            <button
              className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
              leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
              focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
              active:shadow-lg transition duration-150 ease-in-out flex justify-start items-center space-x-2"
              onClick={() => addToCart(product)}
            >
              <span>Add to Cart</span>

              <div className="flex justify-start items-center">
                <FaEthereum size={15} />
                <span className="font-semibold">{product.price}</span>
              </div>
            </button>
          )}
          <button
            className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white"
            onClick={handleChat}
          >
            Chat with Seller
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details
