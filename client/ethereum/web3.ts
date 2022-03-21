import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { isServerSide } from '../utils/isServerSide'

export const getWeb3 = async () => {
  const provider = await detectEthereumProvider()

  if (!isServerSide() && provider) {
    await window?.ethereum?.enable?.()
    return new Web3(provider as provider)
  } else {
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/d771641eadf7448b8f14a1cd7facf02f'
    )
    return new Web3(provider)
  }
}
