import abi from './abis/src/contracts/Shop.sol/Shop.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'
import { logOutWithCometChat } from './Chat.Service'

const toWei = (num) => ethers.utils.parseEther(num.toString())

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const fee = toWei('0.002')

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
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await logOutWithCometChat()
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
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
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
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
    price = toWei(price)

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
  } catch (error) {
    reportError(error)
  }
}

const updateProduct = async ({
  id,
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
    price = toWei(price)

    await contract.updateProduct(
      id,
      name,
      description,
      imageURL,
      price,
      stock,
      {
        from: connectedAccount,
      },
    )
  } catch (error) {
    reportError(error)
  }
}

const deleteProduct = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    await contract.deleteProduct(id, { from: connectedAccount })
  } catch (error) {
    reportError(error)
  }
}

const createOrder = async ({ ids, qtys, phone, destination, grand }) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    grand = toWei(grand)

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

    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    const products = await contract.getProducts()
    const stats = await contract.stats()
    const myStats = await contract.statsOf(connectedAccount)

    setGlobalState('products', structuredProducts(products))
    setGlobalState('stats', structureStats(stats))
    setGlobalState('myStats', structureStats(myStats))
  } catch (error) {
    reportError(error)
  }
}

const loadProduct = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    const product = await contract.getProduct(id)
    const buyers = await contract.getBuyers(id)

    setGlobalState('product', structuredProducts([product])[0])
    setGlobalState('buyers', structuredBuyers(buyers))
  } catch (error) {
    reportError(error)
  }
}

const loadOrders = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = getEtheriumContract()

    const orders = await contract.getOrders()
    setGlobalState('orders', structuredOrders(orders))
  } catch (error) {
    reportError(error)
  }
}

const loadStats = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    const myStats = await contract.statsOf(connectedAccount)

    setGlobalState('myStats', structureStats(myStats))
  } catch (error) {
    reportError(error)
  }
}

const delieverOrder = async (pid, id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    await contract.deliverOrder(pid, id, { from: connectedAccount })
  } catch (error) {
    reportError(error)
  }
}

const cancelOrder = async (pid, id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = getEtheriumContract()
    await contract.cancelOrder(pid, id, { from: connectedAccount })
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
      seller: product.seller.toLowerCase(),
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      stock: Number(product.stock),
      price: parseInt(product.price._hex) / 10 ** 18,
      deleted: product.deleted,
      timestamp: new Date(product.timestamp).getTime(),
    }))
    .reverse()

const structuredOrders = (orders) =>
  orders
    .map((order) => ({
      pid: Number(order.pid),
      id: Number(order.id),
      name: order.name,
      sku: order.sku,
      seller: order.seller.toLowerCase(),
      buyer: order.buyer.toLowerCase(),
      destination: order.destination,
      phone: order.phone,
      imageURL: order.imageURL,
      qty: Number(order.qty),
      status: Number(order.status),
      total: parseInt(order.total._hex) / 10 ** 18,
      timestamp: new Date(order.timestamp.toNumber()).getTime(),
    }))
    .reverse()

const structuredBuyers = (buyers) =>
  buyers
    .map((buyer) => ({
      buyer: buyer.buyer.toLowerCase(),
      qty: Number(buyer.qty),
      price: parseInt(buyer.price._hex) / 10 ** 18,
      timestamp: new Date(buyer.timestamp.toNumber() * 1000).toDateString(),
    }))
    .reverse()

const structureStats = (stats) => ({
  balance: Number(stats.balance),
  orders: Number(stats.orders),
  products: Number(stats.products),
  sales: Number(stats.sales),
  paid: Number(stats.paid._hex),
  sellers: Number(stats.sellers),
})

export {
  isWallectConnected,
  connectWallet,
  createProduct,
  updateProduct,
  deleteProduct,
  loadProducts,
  loadProduct,
  createOrder,
  loadOrders,
  loadStats,
  delieverOrder,
  cancelOrder,
}
