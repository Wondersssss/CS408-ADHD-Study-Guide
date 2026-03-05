import { createContext, useState } from "react"

export const EncouragingLineContext = createContext(null)

const EncouragingLineProvider = ({children}) => {
    const [EncouragingLineOption, setEncouragingLineOption] = useState<boolean>(true)

    return (
        <EncouragingLineContext.Provider value={{EncouragingLineOption, setEncouragingLineOption}}>
            {children}
        </EncouragingLineContext.Provider>
    )
}

export default EncouragingLineProvider