import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

export const CurrencyContext = createContext(null)

const CurrencyProvider = ({children}) => {
    const [currency, setCurrency] = useState<number>(0)

    useEffect(() => {
        const getCurrency = async() => {
            try {
                const currency = await AsyncStorage.getItem('currency')
                if (currency !== null) {
                    setCurrency(JSON.parse(currency))
                }
            }
            catch (error) {
                console.log(error)
            }
        getCurrency()
        }
    }, [])

    return (
        <CurrencyContext.Provider value={{currency, setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider