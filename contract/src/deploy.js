require('dotenv-safe').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const capmaignFactorySource = require('../build/CampaignFactory.json')

const mnemonic = process.env.MNEMONIC
const ethereumClient = process.env.ETHEREUM_CLIENT

console.log('connecting to ethereum...')

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic
  },
  providerOrUrl: ethereumClient
})

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const usedAccount = accounts[0]

  console.log('deploying from account', usedAccount, '...')

  const contract = await new web3.eth.Contract(capmaignFactorySource.abi)
    .deploy({
      data: capmaignFactorySource.bytecode,
      arguments: ['Hi there!']
    })
    .send({ from: usedAccount, gas: 10000000 })

  console.log('contract address', contract.options.address)
}

deploy()
