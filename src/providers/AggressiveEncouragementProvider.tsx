import { createContext, useState } from "react"

export const AggressiveEncouragementContext = createContext(null)

const AggressiveEncouragementProvider = ({children}) => {
    const [AggressiveEncouragementOption, setAggressiveEncouragementOption] = useState<boolean>(false)

    return (
        <AggressiveEncouragementContext.Provider value={{AggressiveEncouragementOption, setAggressiveEncouragementOption}}>
            {children}
        </AggressiveEncouragementContext.Provider>
    )
}

export default AggressiveEncouragementProvider