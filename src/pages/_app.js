import { ChakraProvider } from '@chakra-ui/react'
import { AppContextProvider } from '../contexts/AppContext'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ChakraProvider>
  )
}

export default MyApp