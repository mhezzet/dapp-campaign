import { getCampaignContract } from '../ethereum/campaign-contract'
import { getAccounts } from '../ethereum/get-accounts'

type CreateRequest = (
  request: { description: string; value: string; toAddress: string },
  address: string
) => Promise<any>

export const createRequest: CreateRequest = async ({ toAddress, description, value }, address) => {
  const campaignContract = await getCampaignContract(address)

  const accounts = await getAccounts()

  return campaignContract.methods.createRequest(description, value, toAddress).send({
    from: accounts[0]
  })
}
