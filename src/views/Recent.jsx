import { useEffect, useState } from 'react'
import Identicon from 'react-identicons'
import { useNavigate } from 'react-router-dom'
import { getConversations } from '../Chat.Service'
import { truncate, useGlobalState } from '../store'
import { toast } from 'react-toastify'

const Recent = () => {
  const [users, setUsers] = useState([])
  const [currentUser] = useGlobalState('currentUser')
  const navigate = useNavigate()

  useEffect(async () => {
    if (currentUser) {
      await getConversations().then((list) => setUsers(list))
    } else {
      toast('Please authenticate with the chat feature first!')
      navigate('/')
    }
  }, [])

  return currentUser ? (
    <>
      <div className="h-20"></div>
      <div className="flex flex-col justify-between items-center space-x-2 md:w-2/3 w-full p-5 mx-auto">
        <h4 className="text-center uppercase mb-8">Recent Chats</h4>
        <div className="max-h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md w-full">
          {users.map((user, i) => (
            <Conversation conversation={user.lastMessage} key={i} />
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
  ) : null
}

const Conversation = ({ conversation }) => {
  const navigate = useNavigate()
  const [connectedAccount] = useGlobalState('connectedAccount')

  const uid = (conversation) => {
    return conversation.sender.uid == connectedAccount
      ? conversation.receiver.uid
      : conversation.sender.uid
  }

  return (
    <button
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      className="px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight
      rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
      focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 hover:text-white
      active:shadow-lg transition duration-150 ease-in-out w-full text-left my-2"
      onClick={() => navigate('/chat/' + uid(conversation))}
    >
      <div className="flex justify-start items-center space-x-4">
        <Identicon
          string={uid(conversation)}
          size={30}
          className="h-10 w-10 object-contain rounded-fullbg-white cursor-pointer"
        />

        <div className="flex flex-col justify-start space-y-2">
          <h4 className="font-bold text-md">
            {truncate(uid(conversation), 4, 4, 11)}
          </h4>
          <span className="text-sm">{conversation.text}</span>
          <small className="font-bold">
            {new Date(conversation.sentAt * 1000).toLocaleDateString()}{' '}
            {new Date(conversation.sentAt * 1000).toLocaleTimeString()}
          </small>
        </div>
      </div>
    </button>
  )
}

export default Recent
