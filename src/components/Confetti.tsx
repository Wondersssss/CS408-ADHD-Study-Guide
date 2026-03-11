import LottieView from "lottie-react-native"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { themes, useTheme } from "../theme/theme"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useContext, useEffect } from "react"
import { CurrencyContext } from "../providers/CurrencyProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"

type Props = {
    sessionTime: number
}

const {width, height} = useWindowDimensions()


export default function Confetti ({sessionTime} : Props) {
    const {theme} = useTheme()
    const {currency, setCurrency} = useContext(CurrencyContext)

    useEffect(() => {
        setCurrency(currency + sessionTime)
    },[])
    

    return (
        <LinearGradient
        colors={theme.bgGradient}
        start={{x: 0.2, y: 0.1}}
        end={{x: 0.9, y: 1}}
        style={[styles.container, {backgroundColor: theme.bg}]}>
            <SafeAreaView>
                <StatusBar style={theme.isDark ? 'light' : 'dark'} />
                <View style={styles.view}>
                    <Text style={[styles.title, {color: theme.text}]}>You now have {currency} currency!</Text>
                </View>
                <LottieView
                    autoPlay
                    style={styles.animation}
                    source={require("../../assets/animations/Confetti.json")}
                    resizeMode="cover"
                />
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        alignContent: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.4
    },

    animation: {
        width: width,
        height: height,
    }
})