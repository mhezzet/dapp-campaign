const ganache = require('ganache')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const capmaignFactorySource = require('../build/CampaignFactory.json')
const capmaignSource = require('../build/Campaign.json')

let accounts, factoryContract, campaignContract, campaignAddress

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  factoryContract = await new web3.eth.Contract(capmaignFactorySource.abi)
    .deploy({
      data: capmaignFactorySource.bytecode
    })
    .send({ from: accounts[0], gas: 10000000 })

  await factoryContract.methods.createCampaign('500').send({
    from: accounts[0],
    gas: 10000000
  })

  const [firstCampainAddress] = await factoryContract.methods.getDeployedCampaigns().call()

  campaignAddress = firstCampainAddress

  campaignContract = await new web3.eth.Contract(capmaignSource.abi, campaignAddress)
})

describe('Campaigns', () => {
  it('should deploys a factory and campain', () => {
    expect(factoryContract.options.address).toBeDefined()
    expect(campaignContract.options.address).toBeDefined()
  })

  it('should assign the creator as the campaign manager', async () => {
    const manager = await campaignContract.methods.manager().call()

    expect(accounts[0]).toEqual(manager)
  })

  it('should allow people to contribute to campaign and add them to approvers', async () => {
    await campaignContract.methods.contribute().send({
      value: 550,
      from: accounts[1]
    })

    const isContributer = await campaignContract.methods.approvers(accounts[1]).call()

    expect(isContributer).toBeTruthy()
  })

  it('should contribute with minimum value', async () => {
    await expect(async () => {
      await campaignContract.methods.contribute().send({
        value: 400,
        from: accounts[1]
      })
    }).rejects.toThrowError()
  })

  it('should allow manager to make a payment request', async () => {
    await campaignContract.methods.createRequest('campaing desc', 600, accounts[1]).send({
      from: accounts[0],
      gas: 1000000
    })

    const request = await campaignContract.methods.requests(0).call()

    expect(request.description).toBe('campaing desc')
  })

  it('should processes requests', async () => {
    let balanceBefore = await web3.eth.getBalance(accounts[1])

    balanceBefore = web3.utils.fromWei(balanceBefore, 'ether')

    await campaignContract.methods.contribute().send({
      value: web3.utils.toWei('10', 'ether'),
      from: accounts[2]
    })

    await campaignContract.methods
      .createRequest('campaing desc', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: 1000000
      })

    await campaignContract.methods.approveRequest(0).send({
      from: accounts[2],
      gas: 1000000
    })

    await campaignContract.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: 1000000
    })

    let balanceAfter = await web3.eth.getBalance(accounts[1])

    balanceAfter = web3.utils.fromWei(balanceAfter, 'ether')

    expect(balanceAfter - balanceBefore).toBe(5)
  })
})
