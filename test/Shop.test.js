const { expect } = require('chai')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe('Shop', () => {
  let Contract, contract, seller, buyer, product, orders, order, stats
  const PLACED = 0
  const DELEVIRED = 1
  const CANCELED = 2
  const REFUNDED = 3

  const id = 0
  const wrongId = 100
  let sku = 'RF301'
  let name = 'Game Console'
  let newName = 'UPDATED title'
  let imageURL = 'https://website.com.image.jpg'
  let newImageURL = 'https://newimageurl.com.image.png'
  let description = 'Abandoned by their parents to die.'
  let price = toWei(0.005)
  let stock = 13
  let fee = toWei(0.002)

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
      await contract.createProduct(
        sku,
        name,
        description,
        imageURL,
        price,
        stock,
        {
          from: seller.address,
          value: fee,
        },
      )
    })

    it('Should confirm product creation', async () => {
      product = await contract.getProduct(id)
      expect(product.id).to.equal(id)
    })

    it('Should confirm product updation', async () => {
      product = await contract.getProduct(id)

      expect(product.name).to.equal(name)
      await contract.updateProduct(
        id,
        newName,
        description,
        imageURL,
        price,
        stock,
        {
          from: seller.address,
        },
      )

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
      for (let i = 0; i < ids.length; i++) {
        await contract.createProduct(
          sku,
          name,
          description,
          imageURL,
          price,
          stock,
          {
            from: seller.address,
            value: fee,
          },
        )
      }
    })

    describe('Placing orders', () => {
      beforeEach(async () => {
        for (let i = 0; i < ids.length; i++) {
          await contract
            .connect(buyer)
            .createOrder(ids, qtys, destination, phone, {
              value: toWei(1),
            })
        }
      })

      it('Should confirm order placement', async () => {
        orders = await contract.getOrders()
        expect(orders).to.have.lengthOf(4)
        order = await contract.getOrder(id + 1, id + 1)
        expect(order.status).to.equal(PLACED)
        stats = await contract.statsOf(buyer.address)
        expect(stats.orders).to.equal(4)
      })

      it('Should confirm order marked as delievered', async () => {
        await contract.deliverOrder(id + 1, id + 1, { from: seller.address })
        order = await contract.getOrder(id + 1, id + 1)
        expect(order.status).to.equal(DELEVIRED)
        stats = await contract.statsOf(seller.address)
        expect(stats.paid).to.equal(order.total)
        // const buyers = await contract.getBuyers(id)
        // expect(await buyers).to.have.lengthOf(2)
      })

      it('Should confirm order marked as cancel', async () => {
        await contract.connect(buyer).cancelOrder(id + 1, id + 1)
        order = await contract.getOrder(id + 1, id + 1)
        expect(order.status).to.equal(CANCELED)
      })
      
      it('Should confirm order and product update', async () => {
        order = await contract.getOrder(id, id)
        expect(order.name).to.equal(name)
        expect(order.imageURL).to.equal(imageURL)

        await contract.updateProduct(
          id,
          newName,
          description,
          newImageURL,
          price,
          stock,
          {
            from: seller.address,
          },
        )

        order = await contract.getOrder(id, id)
        expect(order.name).to.equal(newName)
        expect(order.imageURL).to.equal(newImageURL)
      })
    })
  })
})
