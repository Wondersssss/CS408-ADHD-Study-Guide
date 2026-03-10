import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const SoundContext = createContext(null)

const SoundProvider = ({children}) => {
    const [soundOption, setSoundOption] = useState<boolean>(true)

    useEffect(() => {
    const getAsync = async () => {
        try {
            const Async = await AsyncStorage.getItem("soundOption")

            if (Async !== null) {
                const rehydratedValue = Async === "true"
                setSoundOption(rehydratedValue)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAsync()
}, [])

    return (
        <SoundContext.Provider value={{soundOption, setSoundOption}}>
            {children}
        </SoundContext.Provider>
    )
}

export default SoundProvider