import { getCampaignFactoryContract } from '../ethereum/campaign-factory-contract'
import { getAccounts } from '../ethereum/get-accounts'

type CreateCampaign = (contribution: string) => Promise<any>

export const createCampaign: CreateCampaign = async contribution => {
  const campaignFactory = await getCampaignFactoryContract()

  const accounts = await getAccounts()

  return campaignFactory.methods.createCampaign(contribution).send({
    from: accounts[0]
  })
}
