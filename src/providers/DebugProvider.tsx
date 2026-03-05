import { createContext, useState } from "react"

export const DebugContext = createContext(null)

const DebugProvider = ({children}) => {
    const [debugOption, setdebugOption] = useState<boolean>(false)

    return (
        <DebugContext.Provider value={{debugOption, setdebugOption}}>
            {children}
        </DebugContext.Provider>
    )
}

export default DebugProvider