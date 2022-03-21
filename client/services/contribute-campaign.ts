import { getCampaignContract } from '../ethereum/campaign-contract'
import { getAccounts } from '../ethereum/get-accounts'

type ContributeToCampaign = (contribution: string, address: string) => Promise<any>

export const contributeToCampaign: ContributeToCampaign = async (contribution, address) => {
  const campaignContract = await getCampaignContract(address)

  const accounts = await getAccounts()

  return campaignContract.methods.contribute().send({
    from: accounts[0],
    value: contribution
  })
}
