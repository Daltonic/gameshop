import Identicon from 'react-identicons'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  return (
    <>
      <ChatHeader />
      <Messages />
    </>
  )
}

const ChatHeader = () => {
  const navigate = useNavigate()

  return (
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
        onClick={() => navigate('/product/' + 1)}
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
}

const Messages = () => {
  return (
    <div className="w-full md:w-2/3 p-5 mx-auto">
      <div
        id="messages-container"
        className="h-[calc(100vh_-_18rem)] overflow-y-auto mb-8"
      >
        {Array(5)
          .fill()
          .map(() => (
            <>
              <LeftMessage />
              <RightMessage />
            </>
          ))}
      </div>
      <form className="flex w-full">
        <input
          className="w-full bg-gray-200 rounded-lg p-4 
          focus:ring-0 focus:outline-none border-gray-500"
          type="text"
          placeholder="Write a message..."
          required
        />
        <button type="submit" hidden>
          Send
        </button>
      </form>
    </div>
  )
}

const RightMessage = () => (
  <div className="flex flex-row justify-end my-2">
    <div className="flex justify-center items-end space-x-2">
      <div
        className="flex flex-col bg-blue-600 w-80 p-3 px-5 rounded-t-3xl
        rounded-bl-3xl shadow shadow-black text-white font-semibold"
      >
        <div className="flex flex-row justify-start items-center space-x-2">
          <span>@You</span>
          <small>2/06/2022</small>
        </div>
        <small className="leading-tight my-2">Hello</small>
      </div>
    </div>
  </div>
)

const LeftMessage = () => (
  <div className="flex flex-row justify-start my-2">
    <div className="flex justify-center items-end space-x-2">
      <div
        className="flex flex-col bg-transparent w-80 p-3 px-5 rounded-t-3xl
            rounded-br-3xl shadow shadow-gray-500"
      >
        <div className="flex flex-row justify-start items-center space-x-2">
          <span>@Owner</span>
          <small>5/06/2022</small>
        </div>
        <small className="leading-tight my-2">Hi, how much is this Item?</small>
      </div>
    </div>
  </div>
)

export default Chat
