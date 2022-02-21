import { ChakraProvider } from '@chakra-ui/react'
import { AppContextProvider } from '../contexts/AppContext'

import { initializeFireBase } from '../utils/push-notification'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  initializeFireBase()

  return (
    <ChakraProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ChakraProvider>
  )
}

export default MyApp