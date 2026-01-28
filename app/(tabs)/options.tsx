import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, themes, useTheme } from "../../src/theme/theme";
import {StyleSheet, Switch, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LightSwitch from "../../src/components/LightSwitch";
import Slider from "@react-native-community/slider";
import {useContext, useState } from "react";
import TimeProvider, { TimeContext } from "../../src/hooks/TimeProvider";
import EncouragementProvider, { EncouragementContext } from "../../src/hooks/EncouragementProvider";

export default function options () {

  return (
    <AppInner/>
  )
}

function AppInner() {
  const {theme, toggle} = useTheme()

  const {workTime, setWorkTime, breakTime, setBreakTime} = useContext(TimeContext)
  const {encouragement, setEncouragement} = useContext(EncouragementContext)
  const toggleSwitch = () => setEncouragement(previousState => !previousState)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme.isDark ? "light" : "dark"}/>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>Dark Mode:</Text>
        <LightSwitch on={theme.isDark} onToggle={toggle}/>
      </View>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>How long do you want to work before a break?</Text>
        <Text style={styles.textOnTheSide}>{workTime}</Text>
        <Slider
          style={{width: 200, height: 40}}
          step={1}
          minimumValue={20}
          maximumValue={60}
          minimumTrackTintColor={themes.common.red}
          maximumTrackTintColor={themes.common.red}
          value={workTime && +workTime.toFixed(0)}
          onValueChange={setWorkTime}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>How long do you want your break?</Text>
        <Text style={styles.textOnTheSide}>{breakTime}</Text>
        <Slider
          style={{width: 200, height: 40}}
          step={1}
          minimumValue={5}
          maximumValue={30}
          minimumTrackTintColor={themes.common.green}
          maximumTrackTintColor={themes.common.green}
          value={breakTime && +breakTime.toFixed(0)}
          onValueChange={setBreakTime}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={styles.labels}>Do you want encouragement when using the timer?</Text>
        <Text style={styles.textOnTheSide}>{encouragement}</Text>
        <Switch
          trackColor={{false: '#767577', true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={encouragement}
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
