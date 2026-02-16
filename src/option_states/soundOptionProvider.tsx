import { createContext, useState } from "react"

export const SoundContext = createContext(null)

const SoundProvider = ({children}) => {
    const [soundOption, setSoundOption] = useState<boolean>(true)

    return (
        <SoundContext.Provider value={{soundOption, setSoundOption}}>
            {children}
        </SoundContext.Provider>
    )
}

export default SoundProvider