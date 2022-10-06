import abi from './abis/src/contracts/Shop.sol/Shop.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const fee = ethers.utils.parseEther('0.002')

const getEtheriumContract = () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return contract
  } else {
    return getGlobalState('contract')
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const createProduct = async ({
  sku,
  name,
  description,
  imageURL,
  price,
  stock,
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    price = ethers.utils.parseEther(price)

    await contract.createProduct(
      sku,
      name,
      description,
      imageURL,
      price,
      stock,
      {
        from: connectedAccount,
        value: fee._hex,
      },
    )

    window.location.reload()
  } catch (error) {
    reportError(error)
  }
}

const createOrder = async ({ ids, qtys, phone, destination, grand }) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    grand = ethers.utils.parseEther(grand.toString())

    await contract.createOrder(ids, qtys, destination, phone, {
      from: connectedAccount,
      value: grand._hex,
    })
  } catch (error) {
    reportError(error)
  }
}

const loadProducts = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    const products = await contract.getProducts()
    const stats = await contract.stats()

    setGlobalState('products', structuredProducts(products))
    setGlobalState('stats', structureStats(stats))
  } catch (error) {
    reportError(error)
  }
}

const loadOrders = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = getEtheriumContract()
    const connectedAccount = getGlobalState('connectedAccount')

    const orders = await contract.getOrders({ from: connectedAccount })
    setGlobalState('orders', structuredOrders(orders))
  } catch (error) {
    reportError(error)
  }
}

const loadProduct = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    const product = await contract.getProduct(id)

    setGlobalState('product', structuredProducts([product])[0])
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

const structuredProducts = (products) =>
  products
    .map((product) => ({
      id: Number(product.id),
      sku: product.sku,
      seller: product.seller,
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      stock: Number(product.stock),
      price: parseInt(product.price._hex) / 10 ** 18,
      deleted: product.deleted,
      timestamp: new Date(product.timestamp.toNumber()).getTime(),
    }))
    .reverse()

const structuredOrders = (orders) =>
  orders
    .map((order) => ({
      id: Number(order.id),
      sku: order.sku,
      seller: order.seller,
      destination: order.destination,
      phone: order.phone,
      imageURL: order.imageURL,
      qty: Number(order.qty),
      status: Number(order.status),
      total: parseInt(order.total._hex) / 10 ** 18,
      timestamp: new Date(order.timestamp.toNumber()).getTime(),
    }))
    .reverse()

const structureStats = (stats) => ({
  balance: stats.balance.toNumber(),
  orders: stats.orders.toNumber(),
  products: stats.products.toNumber(),
  sales: stats.sales.toNumber(),
  sellers: stats.sellers.toNumber(),
})

export {
  isWallectConnected,
  connectWallet,
  createProduct,
  loadProducts,
  loadProduct,
  createOrder,
  loadOrders,
}
