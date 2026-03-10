import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const AggressiveEncouragementContext = createContext(null)

const AggressiveEncouragementProvider = ({children}) => {
    const [AggressiveEncouragementOption, setAggressiveEncouragementOption] = useState<boolean>(false)

    useEffect(() => {
    const getAggressiveOption = async () => {
        try {
            const AggressiveAsync = await AsyncStorage.getItem("aggressiveOption")

            if (AggressiveAsync !== null) {
                const rehydratedValue = AggressiveAsync === "true"
                setAggressiveEncouragementOption(rehydratedValue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAggressiveOption()
}, [])

    return (
        <AggressiveEncouragementContext.Provider value={{AggressiveEncouragementOption, setAggressiveEncouragementOption}}>
            {children}
        </AggressiveEncouragementContext.Provider>
    )
}

export default AggressiveEncouragementProvider