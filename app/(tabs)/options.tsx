import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../../src/theme/theme";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LightSwitch from "../../src/components/LightSwitch";

export default function options () {
  return (
    <ThemeProvider>
      <AppInner/>
    </ThemeProvider>
  )
}

function AppInner() {
  const {theme, toggle} = useTheme()

  return (
    <SafeAreaView>
      <StatusBar style={theme.isDark ? "light" : "dark"}/>
      <View>
        <LightSwitch on={theme.isDark} onToggle={toggle}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
