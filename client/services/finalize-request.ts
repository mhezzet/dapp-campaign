import { getCampaignContract } from '../ethereum/campaign-contract'
import { getAccounts } from '../ethereum/get-accounts'

export const finalizeRequest = async (campaignAddress: string, requestId: number): Promise<any> => {
  const campaignContract = await getCampaignContract(campaignAddress)

  const accounts = await getAccounts()

  return campaignContract.methods.finalizeRequest(requestId).send({
    from: accounts[0]
  })
}
