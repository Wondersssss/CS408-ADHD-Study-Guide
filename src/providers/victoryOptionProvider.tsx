import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const VictoryContext = createContext(null)

const VictoryProvider = ({children}) => {
    const [victoryOption, setVictoryOption] = useState<boolean>(true)

    useEffect(() => {
    const getAsync = async () => {
        try {
            const Async = await AsyncStorage.getItem("victoryOption")

            if (Async !== null) {
                const rehydratedValue = Async === "true"
                setVictoryOption(rehydratedValue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAsync()
}, [])

    return (
        <VictoryContext.Provider value={{victoryOption, setVictoryOption}}>
            {children}
        </VictoryContext.Provider>
    )
}

export default VictoryProvider