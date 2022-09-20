import game from '../assets/game.jpg'
import { FaEthereum } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Cards = () => {
  return (
    <>
      <h4 className="text-center uppercase">Games</h4>
      <div className="flex flex-wrap justify-center items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
        {Array(5)
          .fill()
          .map((game, i) => (
            <Card id={i} key={i} />
          ))}
      </div>
      <div className='flex justify-center items-center my-5'>
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

const Card = ({id}) => (
  <div className="flex flex-col justify-center items-start space-y-2 my-5">
    <img className="h-56 w-56 object-cover" src={game} alt="Game" />
    <Link to={'/product/' + id} className="text-lg font-bold">Virtual Land</Link>

    <div className="flex justify-between items-center w-full">
      <div className="flex justify-start items-center">
        <FaEthereum size={15} />
        <span className="font-semibold">2.5</span>
      </div>

      <span className="text-sm text-gray-500">6 in stock</span>
    </div>
  </div>
)

export default Cards
