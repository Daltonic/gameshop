import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { loginWithCometChat, signUpWithCometChat } from '../Chat.Service'
import { toast } from 'react-toastify'

const ChatModal = () => {
  const [chatModal] = useGlobalState('chatModal')
  const [connectedAccount] = useGlobalState('connectedAccount')

  const handleLogin = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await loginWithCometChat(connectedAccount)
          .then((res) => res == true ? resolve() : reject())
          .catch(() => reject())
      }),
      {
        pending: 'Signing in...',
        success: 'Successfully signed in 👌',
        error: 'Encountered error while signing in 🤯',
      },
    )

    closeModal()
  }

  const handleSignup = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await signUpWithCometChat(connectedAccount, connectedAccount)
          .then((res) => res == true ? resolve() : reject())
          .catch(() => reject())
      }),
      {
        pending: 'Signing up...',
        success: 'Successfully signed up, proceed to login... 👌',
        error: 'Encountered error while signing up 🤯',
      },
    )

    closeModal()
  }

  const closeModal = () => {
    setGlobalState('chatModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-end items-center">
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black" />
            </button>
          </div>
          <ChatAuth login={handleLogin} sign={handleSignup} />
        </div>
      </div>
    </div>
  )
}

const ChatAuth = ({ login, sign }) => (
  <>
    <div className="flex flex-col justify-center items-center text-center">
      <h4 className="text-xl text-bold mb-3">Authentication</h4>
      <p>
        You will have to sign up or login to access the chat features of this
        app.
      </p>
    </div>

    <div className="flex justify-center items-center space-x-3 text-center mt-5">
      <button
        type="submit"
        onClick={login}
        className="flex flex-row justify-center items-center w-full 
              text-white text-md bg-blue-900
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-blue-900
              hover:border hover:border-blue-900
              focus:outline-none focus:ring mt-5"
      >
        Login
      </button>

      <button
        type="submit"
        onClick={sign}
        className="flex flex-row justify-center items-center w-full 
              text-blue-900 text-md border-blue-900
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:text-white
              hover:border hover:bg-blue-900
              focus:outline-none focus:ring mt-5"
      >
        Sign Up
      </button>
    </div>
  </>
)

export default ChatModal
