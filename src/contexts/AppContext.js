import { createContext, useContext, useState } from "react"

import { Duration } from 'luxon'

const AppContext = createContext()

export function AppContextProvider({ children }) {

    const [cycle, setCycle] = useState(1)
    const [cycleState, setCycleState] = useState('focus')

    const [focusDuration, setFocusDuration] = useState(25)
    const [shortBreakDuration, setShortBreakDuration] = useState(5)
    const [longBreakDuration, setLongBreakDuration] = useState(15)

    const initialTimer = Duration.fromObject({ minutes: focusDuration })

    const [timer, setTimer] = useState(initialTimer)

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
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)