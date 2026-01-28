import { createContext, useState } from "react"

export const EncouragementContext = createContext(null)

const EncouragementProvider = ({children}) => {
    const [encouragement, setEncouragement] = useState<boolean>(true)

    return (
        <EncouragementContext.Provider value={{encouragement, setEncouragement}}>
            {children}
        </EncouragementContext.Provider>
    )
}

export default EncouragementProvider