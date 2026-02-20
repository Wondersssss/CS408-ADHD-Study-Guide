import { createContext, useState } from "react"

export const VictoryContext = createContext(null)

const VictoryProvider = ({children}) => {
    const [victoryOption, setVictoryOption] = useState<boolean>(true)

    return (
        <VictoryContext.Provider value={{victoryOption, setVictoryOption}}>
            {children}
        </VictoryContext.Provider>
    )
}

export default VictoryProvider