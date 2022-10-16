import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { updateProduct } from '../Blockchain.Service'
import { setGlobalState, useGlobalState } from '../store'
import { toast } from 'react-toastify'

const UpateProduct = () => {
  const [modal] = useGlobalState('updateModal')
  const [product] = useGlobalState('product')
  const [name, setName] = useState(product?.name)
  const [price, setPrice] = useState(product?.price)
  const [stock, setStock] = useState(product?.stock)
  const [oldStock, setOldStock] = useState(product?.stock)
  const [description, setDescription] = useState(product?.description)
  const [imageURL, setImageURL] = useState(product?.imageURL)

  useEffect(() => {
    setName(product?.name)
    setDescription(product?.description)
    setPrice(product?.price)
    setStock(product?.stock)
    setImageURL(product?.imageURL)
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !name ||
      !price ||
      !imageURL ||
      !description ||
      !stock ||
      stock < oldStock
    )
      return
    const params = {
      id: product.id,
      name,
      description,
      stock,
      price,
      imageURL,
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updateProduct(params)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction to product...',
        success: 'Product successfully updated, will reflect within 30sec 🦄',
        error: 'Encountered error updating your product 🤯',
      },
    )

    closeModal()
    console.log('Product updated')
  }

  const closeModal = () => {
    setGlobalState('updateModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 z-50 ${modal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Edit Product</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          {imageURL ? (
            <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  alt="Project"
                  className="h-full w-full object-cover cursor-pointer"
                  src={imageURL}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
              value={name || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.001}
              min={0.001}
              name="price"
              placeholder="price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              value={price || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              min={1}
              name="stock"
              placeholder="E.g. 2"
              onChange={(e) => setStock(e.target.value)}
              value={stock || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="ImageURL"
              onChange={(e) => setImageURL(e.target.value)}
              pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              value={imageURL || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description || ''}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-blue-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-blue-500
              hover:border hover:border-blue-500
              focus:outline-none focus:ring mt-5"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpateProduct
