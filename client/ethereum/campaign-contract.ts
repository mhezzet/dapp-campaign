import Campaign from 'contract/build/Campaign.json'
import { AbiItem } from 'web3-utils'
import { getWeb3 } from './web3'

export const getCampaignContract = async (address: string) => {
  const web3 = await getWeb3()

  return new web3.eth.Contract(Campaign.abi as unknown as AbiItem, address)
}
