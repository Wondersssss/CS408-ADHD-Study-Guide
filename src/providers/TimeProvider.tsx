import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const TimeContext = createContext(null)

const TimeProvider = ({children}) => {
    const [workTime, setWorkTime] = useState<number>(40)
    const [breakTime, setBreakTime] = useState<number>(5)

    useEffect(() => {
    const getAsync = async () => {
        try {
            const AsyncWork = await AsyncStorage.getItem("workTime")
            const AsyncBreak = await AsyncStorage.getItem("breakTime")

            if (AsyncWork !== null) {
                setWorkTime(Number(AsyncWork))
            }

            if (AsyncBreak !== null) {
                setBreakTime(Number(AsyncBreak))
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAsync()
}, [])

    return (
        <TimeContext.Provider value={{workTime, setWorkTime, breakTime, setBreakTime}}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider