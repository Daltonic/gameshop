import Identicon from 'react-identicons'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { truncate, useGlobalState } from '../store'
import { sendMessage, CometChat, getMessages } from '../Chat.Service'
import { toast } from 'react-toastify'

const Chat = () => {
  const { id } = useParams()
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
      <ChatHeader id={id} />
      <Messages id={id} />
    </>
  ) : null
}

const ChatHeader = ({ id }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-start w-full md:w-2/3 p-5 mx-auto">
      <span
        className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm
        flex align-center cursor-pointer active:bg-gray-300
        transition duration-300 ease w-max"
      >
        <Identicon
          string={id}
          size={35}
          className="w-11 h-11 max-w-none object-contain rounded-full"
        />
        <span className="flex items-center px-3 py-2">
          {truncate(id, 4, 4, 11)}
        </span>
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

const Messages = ({ id }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    sendMessage(id, message).then((msg) => {
      setMessages((prevState) => [...prevState, msg])
      setMessage('')
      scrollToEnd()
    })
  }

  const listenForMessage = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
          scrollToEnd()
        },
      }),
    )
  }

  const scrollToEnd = () => {
    const element = document.getElementById('messages-container')
    element.scrollTop = element.scrollHeight
  }

  useEffect(async () => {
    listenForMessage(id)
    await getMessages(id).then((messages) =>
      setMessages(messages.filter((msg) => msg.category == 'message')),
    )
  }, [id])

  return (
    <div className="w-full lg:w-2/3 p-5 mx-auto">
      <div
        id="messages-container"
        className="h-[calc(100vh_-_18rem)] overflow-y-auto mb-8"
      >
        {messages.map((message, i) =>
          message.sender.uid != connectedAccount ? (
            <LeftMessage msg={message} key={i} />
          ) : (
            <RightMessage msg={message} key={i} />
          ),
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          className="w-full bg-gray-200 rounded-lg p-4 
          focus:ring-0 focus:outline-none border-gray-500"
          type="text"
          placeholder="Write a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <button type="submit" hidden>
          Send
        </button>
      </form>
    </div>
  )
}

const RightMessage = ({ msg }) => (
  <div className="flex flex-row justify-end my-2">
    <div className="flex justify-center items-end space-x-2">
      <div
        className="flex flex-col bg-blue-600 w-80 p-3 px-5 rounded-t-3xl
        rounded-bl-3xl shadow shadow-black text-white font-semibold"
      >
        <div className="flex flex-row justify-start items-center space-x-2">
          <span>@You</span>
          <small>
            {new Date(msg.sentAt * 1000).toLocaleDateString()}{' '}
            {new Date(msg.sentAt * 1000).toLocaleTimeString()}
          </small>
        </div>
        <small className="leading-tight my-2">{msg.text}</small>
      </div>
    </div>
  </div>
)

const LeftMessage = ({ msg }) => (
  <div className="flex flex-row justify-start my-2">
    <div className="flex justify-center items-end space-x-2">
      <div
        className="flex flex-col bg-transparent w-80 p-3 px-5 rounded-t-3xl
            rounded-br-3xl shadow shadow-gray-500"
      >
        <div className="flex flex-row justify-start items-center space-x-2">
          <span>@{truncate(msg.sender.uid, 4, 4, 11)}</span>
          <small>
            {new Date(msg.sentAt * 1000).toLocaleDateString()}{' '}
            {new Date(msg.sentAt * 1000).toLocaleTimeString()}
          </small>
        </div>
        <small className="leading-tight my-2">{msg.text}</small>
      </div>
    </div>
  </div>
)

export default Chat
