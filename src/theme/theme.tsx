import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react"
import { Appearance, ColorValue } from "react-native"

type GradientTuple = readonly [ColorValue, ColorValue, ...ColorValue[]]

export const themes = {
    common: { // palette colours
        orange: "#FCAB10",
        red: "#F8333C",
        green: "#44AF69",
        blue: "#2B9EB3"
    },
    dark: { // dark mode
        isDark: true,
        bg: "#000000",
        bgGradient: ["#000000", "#15151c"] as const,
        text: "#f7f7fb",
        textSoft: "#ffffff",
        textMuted: "#a3a3b2",
        card: "#f7f7fb",
        outline: "rbga(255,255,255,0.08)",
    },
    light: { //  da light mode
        isDark: false,
        bg: "#fbfbfe",
        bgGradient: ["#fbfbfe", "#f1f1f6"] as const,
        text: "#121217",
        textSoft: "#0e0e12",
        textMuted: "#5f6070",
        card: "#ffffff",
        outline: "rgba(0,0,0,0,0.06)"
    }
}

type Theme = {
    isDark: boolean
    bg: string
    bgGradient: GradientTuple
    text: string
    textSoft: string
    textMuted: string
    card: string
    outline: string
}

const ThemeCtx = createContext<{theme: Theme; toggle: () => void}>({
    theme: 
    Appearance.getColorScheme() === "dark"
    ? (themes.dark as Theme)
    : (themes.light as Theme),
    toggle: () => {}
})

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const prefersDark = Appearance.getColorScheme() === "dark"
    const [isDark, setIsDark] = useState(prefersDark)

    // useEffect(() => {
    // const getAsync = async () => {
    //     try {
    //         const Async = await AsyncStorage.getItem("theme")

    //         if (Async !== null) {
    //             const rehydratedValue = Async === "true"
    //             setIsDark(rehydratedValue)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // getAsync()
    // }, [])

    const theme = useMemo<Theme>(
        () => (isDark ? (themes.dark as Theme) : (themes.light as Theme)),
        [isDark]
    )
    const toggle = useCallback(async() => {
        setIsDark((prev) => !prev)
        // await AsyncStorage.setItem('theme', JSON.stringify(!isDark))
    }, [])

    return (
        <ThemeCtx.Provider value={{theme, toggle}}>{children}</ThemeCtx.Provider>
    )
}

export const useTheme = () => useContext(ThemeCtx)