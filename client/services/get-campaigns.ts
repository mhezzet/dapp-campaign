import { getCampaignFactoryContract } from '../ethereum/campaign-factory-contract'

type GetCampaigns = () => Promise<string[]>

export const getCampaigns: GetCampaigns = async () => {
  const campaignFactory = await getCampaignFactoryContract()

  return campaignFactory.methods.getDeployedCampaigns().call()
}
