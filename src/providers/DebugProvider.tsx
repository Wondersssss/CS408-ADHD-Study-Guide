import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const DebugContext = createContext(null)

const DebugProvider = ({children}) => {
    const [debugOption, setdebugOption] = useState<boolean>(false)

    useEffect(() => {
    const getAsync = async () => {
        try {
            const Async = await AsyncStorage.getItem("debugOption")

            if (Async !== null) {
                const rehydratedValue = Async === "true"
                setdebugOption(rehydratedValue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAsync()
}, [])

    return (
        <DebugContext.Provider value={{debugOption, setdebugOption}}>
            {children}
        </DebugContext.Provider>
    )
}

export default DebugProvider