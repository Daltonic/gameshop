import Identicon from 'react-identicons'
import { useNavigate } from 'react-router-dom'
const Recent = () => {
  return (
    <>
      <div className="h-20"></div>
      <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
        <h4 className="text-center uppercase mb-8">Recent Chats</h4>
        <div className="max-h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md w-full">
          {Array(10)
            .fill()
            .map((conv, i) => (
              <Conversation key={i} />
            ))}
        </div>

        <div className="flex justify-between items-center my-4">
          <button
            className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  )
}

const Conversation = () => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
        rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
        active:shadow-lg transition duration-150 ease-in-out w-full text-left my-2"
      onClick={() => navigate('/chat/' + 1)}
    >
      <div className="flex justify-start items-center space-x-4">
        <Identicon
          string={'account'}
          size={30}
          className="h-10 w-10 object-contain rounded-full
        bg-white cursor-pointer"
        />

        <div className="flex flex-col justify-start space-y-2">
          <h4 className="font-bold text-md">0x2f...23e9</h4>
          <span className="text-sm">
            Hey, can you reduce the price on the NFT game code?
          </span>
          <small className="font-bold">23/6/2022 12:45pm</small>
        </div>
      </div>
    </button>
  )
}

export default Recent
