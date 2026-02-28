import LottieView from "lottie-react-native"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { themes, useTheme } from "../theme/theme"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { useContext } from "react"
import { CurrencyContext } from "../providers/CurrencyProvider"


const {width, height} = useWindowDimensions()
const {theme, toggle} = useTheme()

const Confetti: React.FC = () => {
    const {currency} = useContext(CurrencyContext)


    return (
        <LinearGradient
        colors={theme.bgGradient}
        start={{x: 0.2, y: 0.1}}
        end={{x: 0.9, y: 1}}
        style={[styles.container, {backgroundColor: theme.bg}]}>
            <SafeAreaView>
                <StatusBar style={theme.isDark ? 'light' : 'dark'} />
                <View style={styles.view}>
                    <Text style={styles.title}>You now have {currency} currency! Check the shop!</Text>
                </View>
                <LottieView
                    autoPlay
                    style={styles.animation}
                    source={require("../../animations/Confetti.json")}
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
export default Confetti