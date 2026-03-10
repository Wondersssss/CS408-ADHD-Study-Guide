import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const CurrencyContext = createContext(null)

const CurrencyProvider = ({children}) => {
    const [currency, setCurrency] = useState<number>(0)

    useEffect(() => {
    const getCurrency = async () => {
        try {
            const CurrencyAsync = await AsyncStorage.getItem("currency")

            if (CurrencyAsync !== null) {
                setCurrency(Number(CurrencyAsync))
            }
        } catch (error) {
            console.log(error)
        }
    }

    getCurrency()
}, [])

    return (
        <CurrencyContext.Provider value={{currency, setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider