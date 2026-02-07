import { createContext, useState } from "react"

export const EncouragementContext = createContext(null)

const EncouragementProvider = ({children}) => {
    const [encouraged, setEncouragement] = useState<boolean>(true)

    return (
        <EncouragementContext.Provider value={{encouraged, setEncouragement}}>
            {children}
        </EncouragementContext.Provider>
    )
}

export default EncouragementProvider