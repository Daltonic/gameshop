import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { deleteProduct } from '../Blockchain.Service'
import { toast } from 'react-toastify'

const DeleteProduct = () => {
  const [deleteModal] = useGlobalState('deleteModal')
  const [product] = useGlobalState('product')

  const handleDelete = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await deleteProduct(product?.id)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approving transaction...',
        success: 'Product deleted, will reflect within 30sec 👌',
        error: 'Encountered error deleting your product 🤯',
      },
    )

    closeModal()
  }

  const closeModal = () => {
    setGlobalState('deleteModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${deleteModal}`}
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

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="Product"
                className="h-full w-full object-cover cursor-pointer"
                src={product?.imageURL}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center  text-center mt-5">
            <p>
              You are about to delete <strong>"{product?.name}"</strong>{' '}
              permanently!
            </p>
            <small className="text-red-400">Are you sure?</small>
          </div>

          <button
            type="submit"
            onClick={handleDelete}
            className="flex flex-row justify-center items-center w-full 
              text-white text-md bg-red-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-red-500
              hover:border hover:border-red-500
              focus:outline-none focus:ring mt-5"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProduct
