import { SafeAreaView } from "react-native-safe-area-context";
import { themes, useTheme } from "../../src/theme/theme";
import {Alert, Button, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LightSwitch from "../../src/components/LightSwitch";
import Slider from "@react-native-community/slider";
import {useContext} from "react";
import { TimeContext } from "../../src/providers/TimeProvider";
import { EncouragingLineContext } from "../../src/providers/EncouragingLineProvider";
import { VictoryContext } from "../../src/providers/victoryOptionProvider";
import { SoundContext } from "../../src/providers/soundOptionProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AggressiveEncouragementContext } from "../../src/providers/AggressiveEncouragementProvider";
import * as Haptic from 'expo-haptics'
import { DebugContext } from "../../src/providers/DebugProvider";

export default function options () {

  const {theme, toggle} = useTheme()
  const {workTime, setWorkTime, breakTime, setBreakTime} = useContext(TimeContext)
  const {encouragingLineOption, setEncouragingLineOption} = useContext(EncouragingLineContext)
  const {victoryOption, setVictoryOption} = useContext(VictoryContext)
  const {soundOption, setSoundOption} = useContext(SoundContext)
  const {AggressiveEncouragementOption, setAggressiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const {debugOption, setdebugOption} = useContext(DebugContext)

  const toggleEncouragementSwitch = () => {setEncouragingLineOption(prevState => !prevState); Haptic.selectionAsync()}
  const toggleVictorySwitch = () => {setVictoryOption(prevState => !prevState); Haptic.selectionAsync()}
  const toggleSoundSwitch = () => {setSoundOption(prevState => !prevState); Haptic.selectionAsync()}
  const toggleAggressiveSwitch = () => {setAggressiveEncouragementOption(prevState => !prevState); Haptic.selectionAsync()}
  const toggleDebugSwitch = () => {setdebugOption(prevState => !prevState); Haptic.selectionAsync()}
  

  return (
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >
    <ScrollView indicatorStyle={theme.isDark ? "black" : "white"}>
      <StatusBar style={theme.isDark ? "light" : "dark"}/>
      <View style={styles.subtitleView}>
        <Text style={[styles.subtitle, {color: theme.text}]}>Style</Text>
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Dark Mode:</Text>
        <LightSwitch on={theme.isDark} onToggle={toggle}/>
      </View>
      <View style={styles.subtitleView}>
        <Text style={[styles.subtitle, {color:theme.text}]}>Study Times</Text>
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>How long do you want to work before a break?</Text>
        <Text style={[styles.textOnTheSide, {color:theme.text}]}>{workTime}</Text>
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
        <Text style={[styles.labels, {color:theme.text}]}>How long do you want your break?</Text>
        <Text style={[styles.textOnTheSide, {color:theme.text}]}>{breakTime}</Text>
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
      <View style={styles.subtitleView}>
        <Text style={[styles.subtitle, {color:theme.text}]}>Encouragement/Preference</Text>
      </View>
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Do you want encouraging messages when using the timer?</Text>
        <Switch
          trackColor={{false: themes.common.red, true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEncouragementSwitch}
          value={encouragingLineOption}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Do you want a more aggressive style of encouragement?</Text>
        <Switch
          trackColor={{false: themes.common.red, true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAggressiveSwitch}
          value={AggressiveEncouragementOption}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Do you want a victory screen when the timer finishes?</Text>
        <Switch
          trackColor={{false: themes.common.red, true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleVictorySwitch}
          value={victoryOption}
        />
      </View>
        <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Do you want sounds to play?</Text>
        <Switch
          trackColor={{false: themes.common.red, true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSoundSwitch}
          value={soundOption}
        />
      </View>
      <View style={styles.optionArea}>
        <Text style={[styles.labels, {color:theme.text}]}>Debug Mode</Text>
        <Switch
          trackColor={{false: themes.common.red, true: themes.common.green}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDebugSwitch}
          value={debugOption}
        />
      </View>
    </ScrollView>
    </LinearGradient>
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
  },
  subtitle: {
    paddingLeft: 20,
    fontSize: 40,
    fontWeight: 'bold'
  },
  subtitleView: {
    fontWeight: '600',
    paddingVertical: 20,
    marginLeft: -20
  },
})
