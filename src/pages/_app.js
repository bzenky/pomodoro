import { useState } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.scss'

import { AppContext } from '../contexts/AppContext'

import { Duration } from 'luxon'

function MyApp({ Component, pageProps }) {
  const [focusDuration, setFocusDuration] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)

  let initialTimer = Duration.fromObject({ minutes: focusDuration })

  const [timer, setTimer] = useState(initialTimer)
  
  const values = {
    focusDuration,
    setFocusDuration,
    shortBreakDuration,
    setShortBreakDuration,
    longBreakDuration,
    setLongBreakDuration,
    timer,
    setTimer,
    initialTimer,
  }

  return (
    <AppContext.Provider value={values}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContext.Provider>
  )
}

export default MyApp
