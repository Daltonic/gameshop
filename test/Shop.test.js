const { expect } = require('chai')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe('Shop', () => {
  let Contract, contract, seller, buyer, product, orders, order
  const PLACED = 0
  const DELEVIRED = 1
  const CANCELED = 2
  const REFUNDED = 3

  const id = 0
  let sku = 'RF301'
  let name = 'Game Console'
  let description = 'Abandoned by their parents to die.'
  let price = toWei(0.005)
  let stock = 13
  let fee = 400000

  const ids = [0, 1]
  const qtys = [2, 3]
  const destination = 'Adageorge'
  const phone = '08156970922'

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('Shop')
    ;[seller, buyer] = await ethers.getSigners()

    contract = await Contract.deploy(fee)
  })

  describe('Deployment', () => {
    it('Should confirm deployer address', async () => {
      expect(await contract.owner()).to.equal(seller.address)
    })

    it('Should Tax on product', async () => {
      expect(await contract.fee()).to.equal(fee)
    })
  })

  describe('Product', () => {
    beforeEach(async () => {
      await contract.createProduct(sku, name, description, price, stock, {
        from: seller.address,
        value: fee,
      })
    })

    it('Should confirm product creation', async () => {
      product = await contract.getProduct(id)
      expect(product.id).to.equal(id)
    })

    it('Should confirm product updation', async () => {
      product = await contract.getProduct(id)
      const newName = 'UPDATED title'

      expect(product.name).to.equal(name)
      await contract.updateProduct(id, newName, description, price, stock, {
        from: seller.address,
      })

      product = await contract.getProduct(id)
      expect(product.name).to.equal(newName)
    })

    it('Should confirm product deletion', async () => {
      product = await contract.getProduct(id)

      expect(product.deleted).to.equal(false)
      await contract.deleteProduct(id, {
        from: seller.address,
      })

      product = await contract.getProduct(id)
      expect(product.deleted).to.equal(true)
    })
  })

  describe('Order', () => {
    beforeEach(async () => {
      for (let i = 0; i < 2; i++) {
        await contract.createProduct(sku, name, description, price, stock, {
          from: seller.address,
          value: fee,
        })
      }
    })

    describe('Placing orders', () => {
      beforeEach(async () => {
        await contract
          .connect(buyer)
          .createOrder(ids, qtys, destination, phone, {
            value: toWei(1),
          })
      })

      it('Should confirm seller order placement', async () => {
        orders = await contract.getSales({ from: seller.address })
        expect(await orders).to.have.lengthOf(2)
      })

      it('Should confirm buyer order placement', async () => {
        orders = await contract.connect(buyer).getOrders()
        expect(await orders).to.have.lengthOf(2)
      })

      it('Should confirm seller order marked as delievered', async () => {
        order = await contract.getSale(id, { from: seller.address })
        expect(order.status).to.equal(PLACED)
        await contract.markOrderAs(id, DELEVIRED, { from: seller.address })
        order = await contract.getSale(id, { from: seller.address })
        expect(order.status).to.equal(DELEVIRED)
      })

      it('Should confirm buyer order marked as delievered', async () => {
        order = await contract.connect(buyer).getOrder(id)
        expect(order.status).to.equal(PLACED)
        await contract.markOrderAs(id, DELEVIRED, { from: seller.address })
        order = await contract.connect(buyer).getOrder(id)
        expect(order.status).to.equal(DELEVIRED)
      })

      it('Should confirm buyer order marked as cancel', async () => {
        order = await contract.connect(buyer).getOrder(id)
        expect(order.status).to.equal(PLACED)
        await contract.connect(buyer).cancelOrder(id)
        order = await contract.connect(buyer).getOrder(id)
        expect(order.status).to.equal(CANCELED)
      })
    })
  })
})
