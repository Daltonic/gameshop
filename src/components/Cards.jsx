import Identicon from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { truncate } from '../store'

const Cards = ({ products, title, seller }) => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        {seller ? (
          <Identicon
            string={'0adsclsidnt'}
            size={70}
            className="h-10 w-10 object-contain rounded-full cursor-pointer shadow-sm shadow-gray-400"
          />
        ) : null}
        <h4 className="text-center uppercase">{title}</h4>
      </div>

      <div className="flex flex-wrap justify-center items-center space-x-6 md:w-2/3 w-full p-5 mx-auto">
        {products.map((product, i) =>
          product.deleted ? null : <Card product={product} key={i} />,
        )}
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
    </>
  )
}

const Card = ({ product }) => (
  <div className="flex flex-col justify-center items-center sm:items-start my-5 w-full sm:w-1/4">
    <Link to={'/product/' + product.id}>
      <img
        className="h-56 w-56 object-cover"
        src={product.imageURL}
        alt={product.name}
      />
      <h4 className="text-lg font-bold">{truncate(product.name, 20, 0, 23)}</h4>
    </Link>

    <div className="flex flex-row sm:flex-col justify-between items-start w-56">
      <div className="flex justify-start items-center">
        <FaEthereum size={15} />
        <span className="font-semibold">{product.price}</span>
      </div>

      <span className="text-sm text-gray-500">{product.stock} in stock</span>
    </div>
  </div>
)

export default Cards
