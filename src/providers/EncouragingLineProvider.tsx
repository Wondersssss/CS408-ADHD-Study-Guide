import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const EncouragingLineContext = createContext(null)

const EncouragingLineProvider = ({children}) => {
    const [encouragingLineOption, setEncouragingLineOption] = useState<boolean>(true)

    useEffect(() => {
    const getAsync = async () => {
        try {
            const Async = await AsyncStorage.getItem("encouragingLineOption")

            if (Async !== null) {
                const rehydratedValue = Async === "true"
                setEncouragingLineOption(rehydratedValue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAsync()
}, [])

    return (
        <EncouragingLineContext.Provider value={{encouragingLineOption, setEncouragingLineOption}}>
            {children}
        </EncouragingLineContext.Provider>
    )
}

export default EncouragingLineProvider