import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, themes, useTheme } from "../../src/theme/theme";
import {StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LightSwitch from "../../src/components/LightSwitch";
import Slider from "@react-native-community/slider";
import { useState } from "react";
export default function options () {
  return (
    <ThemeProvider>
      <AppInner/>
    </ThemeProvider>
  )
}

function AppInner() {
  const {theme, toggle} = useTheme()

  const [workLength, setWorkLength] = useState(40)
  const [breakLength, setBreakLength] = useState(10)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme.isDark ? "light" : "dark"}/>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>Dark Mode:</Text>
        <LightSwitch on={theme.isDark} onToggle={toggle}/>
      </View>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>How long do you want to work before a break?</Text>
        <Text style={styles.textOnTheSide}>{workLength}</Text>
        <Slider
          style={{width: 200, height: 40}}
          step={1}
          minimumValue={20}
          maximumValue={60}
          minimumTrackTintColor={themes.common.red}
          maximumTrackTintColor={themes.common.red}
          value={workLength && +workLength.toFixed(0)}
          onValueChange={setWorkLength}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>How long do you want your break?</Text>
        <Text style={styles.textOnTheSide}>{breakLength}</Text>
        <Slider
          style={{width: 200, height: 40}}
          step={1}
          minimumValue={5}
          maximumValue={30}
          minimumTrackTintColor={themes.common.green}
          maximumTrackTintColor={themes.common.green}
          value={breakLength && +breakLength.toFixed(0)}
          onValueChange={setBreakLength}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    paddingLeft: 20
  },
  labels: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  optionArea: {
    paddingBottom: 40
  },
  textOnTheSide: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '400',
  }
})
