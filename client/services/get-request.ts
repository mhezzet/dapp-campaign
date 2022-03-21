import { getCampaignContract } from '../ethereum/campaign-contract'

type Request = {
  description: string
  value: string
  recipient: string
  complete: boolean
  approvalCount: string
}

type GetRequest = (arg1: string, arg2: string, arg3: number) => Promise<Request>

export const getRequest: GetRequest = async (_, address, requestId) => {
  const campaignContract = await getCampaignContract(address)

  return campaignContract.methods.requests(requestId).call()
}
