import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'

const Chat = () => {
  return (
    <>
      <ChatHeader />
    </>
  )
}

const ChatHeader = () => (
  <div className="flex justify-between items-start w-full md:w-2/3 p-5 mx-auto">
    <span
      className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm
        flex align-center cursor-pointer active:bg-gray-300
        transition duration-300 ease w-max"
    >
      <Identicon
        string={'buyer'}
        size={35}
        className="w-11 h-11 max-w-none object-contain rounded-full"
      />
      <span className="flex items-center px-3 py-2">0xe2...ac3</span>
    </span>

    <span
      className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm
        flex align-center cursor-pointer active:bg-gray-300
        transition duration-300 ease w-max"
    >
      <span className="flex items-center px-3 py-2">Exit</span>
      <button className="bg-transparent hover focus:outline-none pr-2">
        <FaTimes size={15} />
      </button>
    </span>
  </div>
)

export default Chat
