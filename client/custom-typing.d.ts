declare module '@metamask/detect-provider' {
  // declare interface EthereumProvider

  declare global {
    interface Window {
      ethereum?: {
        isMetaMask?: boolean
        enable?: () => Promise<boolean>
      }
    }
  }

  declare function detectEthereumProvider({
    mustBeMetaMask,
    silent,
    timeout
  }?: {
    mustBeMetaMask?: boolean | undefined
    silent?: boolean | undefined
    timeout?: number | undefined
  }): Promise<unknown>

  export = detectEthereumProvider
}
