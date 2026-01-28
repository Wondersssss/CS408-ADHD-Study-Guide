import { createContext, useState } from "react"

export const TimeContext = createContext(null)

const TimeProvider = ({children}) => {
    const [workTime, setWorkTime] = useState<number>(40)
    const [breakTime, setBreakTime] = useState<number>(5)

    return (
        <TimeContext.Provider value={{workTime, setWorkTime, breakTime, setBreakTime}}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider