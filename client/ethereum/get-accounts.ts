import { getWeb3 } from './web3'

export const getAccounts = async () => {
  const web3 = await getWeb3()

  return web3.eth.getAccounts()
}
