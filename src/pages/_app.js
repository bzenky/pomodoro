import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
