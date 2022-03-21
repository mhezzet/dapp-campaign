import { getCampaignContract } from '../ethereum/campaign-contract'

type CampaignSummary = {
  minimumContribution: string
  balance: string
  requestsCount: string
  approversCount: string
  manager: string
}

type GetCampaignSummary = (arg1: string, arg2: string) => Promise<CampaignSummary>

export const getCampaignSummary: GetCampaignSummary = async (_, address) => {
  const campaignContract = await getCampaignContract(address)

  const summary = await campaignContract.methods.getSummary().call()

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  }
}
