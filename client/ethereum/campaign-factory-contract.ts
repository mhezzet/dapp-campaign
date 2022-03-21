import CampaignFactory from 'contract/build/CampaignFactory.json'
import { AbiItem } from 'web3-utils'
import { getWeb3 } from './web3'

export const getCampaignFactoryContract = async () => {
  const web3 = await getWeb3()

  return new web3.eth.Contract(
    CampaignFactory.abi as unknown as AbiItem,
    '0xb3Fdd59De8FE35a76b69802148b6041Eeee2E69B'
  )
}
