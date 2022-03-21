import { ChakraProvider, useToast } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

const MyApp: React.FC = ({ children }) => {
  const toast = useToast()

  return (
    <SWRConfig
      value={{
        onError: error => {
          toast({
            title: error.message,
            status: 'error',
            isClosable: true
          })
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}

const MyAppContainer = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <MyApp>
        <Component {...pageProps} />
      </MyApp>
    </ChakraProvider>
  )
}

export default MyAppContainer
