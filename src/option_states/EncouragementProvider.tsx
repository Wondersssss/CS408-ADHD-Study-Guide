import { createContext, useState } from "react"

export const EncouragementContext = createContext(null)

const EncouragementProvider = ({children}) => {
    const [encouragementOption, setEncouragementOption] = useState<boolean>(true)

    return (
        <EncouragementContext.Provider value={{encouragementOption, setEncouragementOption}}>
            {children}
        </EncouragementContext.Provider>
    )
}

export default EncouragementProvider