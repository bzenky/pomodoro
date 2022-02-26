import { createContext, useContext, useState, useRef, useEffect } from 'react'

import { setPersistedState } from '../utils/setPersistedState'

import { Duration } from 'luxon'

import useSound from 'use-sound'

import { getMessaging, getToken } from 'firebase/messaging'

import Favicon from '../../public/favicon.ico'

import axios from 'axios'

const AppContext = createContext()

import { multiLanguageTexts } from '../utils/multiLanguageTexts'

export function AppContextProvider({ children }) {

  const [cycle, setCycle] = useState(1)
  const [cycleState, setCycleState] = useState('focus')

  const [focusDuration, setFocusDuration] = setPersistedState('focusDuration', 25)
  const [shortBreakDuration, setShortBreakDuration] = setPersistedState('shortBreakDuration', 5)
  const [longBreakDuration, setLongBreakDuration] = setPersistedState('longBreakDuration', 15)

  const initialTimer = Duration.fromObject({ minutes: focusDuration })

  const [timer, setTimer] = useState(initialTimer)

  const [buttonDescription, setButtonDescription] = useState(true)
  const [pause, setPause] = useState(true)
  const [notifications, setNotifications] = setPersistedState('notificationActived', false)

  const [muted, setMuted] = useState(false)

  const [languageSelected, setLanguageSelected] = setPersistedState('language', "en")

  const [alarm] = useSound('/alarm.wav', { interrupt: true, volume: muted ? 0 : 1 })
  const [reset] = useSound('/reset.wav', { interrupt: true, volume: muted ? 0 : 0.6 })
  const [clock] = useSound('/clock.wav', { interrupt: true, volume: muted ? 0 : 1 })

  let intervalRef = useRef()
  const workerRef = useRef()

  function handleClick() {

    function initializaWebWorker() {
      clock()
      workerRef.current = new Worker(new URL('../utils/worker.js', import.meta.url))
      workerRef.current.onmessage = message => {
        decreaseNum()
      }
    }

    function decreaseNum() {
      if (timer == 0) {
        setButtonDescription(true)
        return
      } else {
        return setTimer(prev => prev.minus({ seconds: 1 }))
      }
    }

    if (!pause) {
      setButtonDescription(true)
      clearInterval(intervalRef.current)
      workerRef.current.terminate()
    } else {
      setButtonDescription(false)
      intervalRef.current = initializaWebWorker()
    }
    setPause(prev => !prev)
  }

  function resetTimer() {
    setButtonDescription(true)
    setTimer(initialTimer)
    setCycle(1)
    setPause(true)
    setCycleState('focus')
    clearInterval(intervalRef.current)
    reset()
    workerRef.current.terminate()
  }

  function cycles(duration, cycle) {
    setButtonDescription(true)
    setTimer(Duration.fromObject({ minutes: duration }))
    setCycle(cycle)
    setPause(true)
    clearInterval(intervalRef.current)
    workerRef.current.terminate()
  }

  async function pushNotification() {
    if (notifications) {
      const messaging = getMessaging()

      const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })

      const header = {
        'Content-Type': 'application/json',
        'Authorization': process.env.NEXT_PUBLIC_SERVER_KEY
      }

      const body = {
        'notification': {
          'title': 'Atenção!! Seu ciclo terminou.',
          'body': 'Retorne ao App para continuar.',
          'icon': Favicon.src,
          'vibrate': [200, 100, 200]
        },
        'to': token
      }

      const url = 'https://fcm.googleapis.com/fcm/send'

      axios.post(url, body, { headers: header })
    }
  }

  const values = {
    cycle,
    cycleState,
    focusDuration,
    initialTimer,
    longBreakDuration,
    shortBreakDuration,
    setCycle,
    setCycleState,
    setFocusDuration,
    setLongBreakDuration,
    setShortBreakDuration,
    setTimer,
    timer,
    muted,
    setMuted,
    buttonDescription,
    setButtonDescription,
    pause,
    setPause,
    alarm,
    reset,
    clock,
    intervalRef,
    handleClick,
    resetTimer,
    cycles,
    pushNotification,
    notifications,
    setNotifications,
    state: {
      texts: multiLanguageTexts[languageSelected],
    },
    languageSelected,
    setLanguageSelected,
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)