import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTheme, themes } from "../../src/theme/theme";
import usePomodoro from "../../src/hooks/usePomodoro";
import { formatMMSS } from "../../src/utils/format";
import { formatSELECT } from "../../src/utils/formatSELECT";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ProgressButton from "../../src/components/ProgressButton";
import Controls from "../../src/components/TimerControls";
import { randomNumberGenerator } from "../../src/utils/randomNumberGenerator";
import { TimeContext } from "../../src/providers/TimeProvider";
import { EncouragingLineContext } from "../../src/providers/EncouragingLineProvider";
import HideableView from "../../src/components/HideableView";
import { useSoundEffects } from "../../src/hooks/useSoundEffects";
import Confetti from "../../src/components/Confetti";
import { VictoryContext } from "../../src/providers/victoryOptionProvider";
import { CurrencyContext } from "../../src/providers/CurrencyProvider";
import { SoundContext } from "../../src/providers/soundOptionProvider";
import { AggressiveEncouragementContext } from "../../src/providers/AggressiveEncouragementProvider";
import { DebugContext } from "../../src/providers/DebugProvider";
import * as Haptic from 'expo-haptics'
import AsyncStorage from "@react-native-async-storage/async-storage";

const quoteList = [
    "Why don't you time yourself? No pressure though.",
    "You got this!! Absolutely!",
    "Don't feel bad if you're not up to it, breaks are good!",
    "Remember to not overwork yourself!",
    "I believe in you :)",
    "I think you're super smart, so you definitely got this >:)",
    "I'm proud of your journey.",
    "Go beyond! Plus Ultra!",
    "Hello again :p",
    "Give it your all!",
    "Do you want to study? It's ok if you need a minute."
]

const encouragement = quoteList[randomNumberGenerator(quoteList)]
const BREAK_TEXT = "Work"
const WORK_TEXT = "Break"

const { playSound } = useSoundEffects()

export default function timer () {
  const {theme} = useTheme()
  const {workTime, setWorkTime, breakTime, setBreakTime} = useContext(TimeContext)
  const {encouragingLineOption} = useContext(EncouragingLineContext)
  const {victoryOption} = useContext(VictoryContext)
  const [durationSec, setDurationSec] = useState<number>(0)
  const [sessionTime, setSessionTime] = useState<number>(0)
  const [isSelecting, setSelecting] = useState<boolean>(true)
  const [confetti, setConfetti] = useState<boolean>(false)
  const {currency, setCurrency} = useContext(CurrencyContext)
  const {debugOption} = useContext(DebugContext)
  const {soundOption} = useContext(SoundContext)
  const {AggressiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setWorkTime(debugOption ? workTime : workTime * 60)
    setBreakTime(debugOption ? breakTime : breakTime * 60)
  }, [setBreakTime, setWorkTime])


  const {totalSecondsLeft, running, progress, start, pause, reset, mode, stateTimeLeft} = usePomodoro({
    durationSec,
    onFinish: async() => {
      playSound("timerWin", soundOption)
      setConfetti(true)
      setSelecting(true)
      setTimeout(() => {
        setConfetti(false)
      }, 5000)
      await AsyncStorage.setItem('currency', JSON.stringify(currency + sessionTime))
    }, 
    workTime,
    breakTime,
    onStateChange: () => {
      playSound(mode === "work" ? "workWin" : "breakWin", soundOption, 0.5)
    }
  })

  const time = useMemo(() => formatMMSS(totalSecondsLeft), [totalSecondsLeft])
  const stateTime = useMemo(() => formatMMSS(stateTimeLeft), [stateTimeLeft])

  const exitPrompt = () => {
    Haptic.selectionAsync()
    let pausedInPrompt: boolean = false
    if (running) {
      pausedInPrompt = true
      pause()
      Haptic.selectionAsync()
    }
    Alert.alert("Ending Timer", "Are you sure you want to cancel the timer?", [
      {
        text: "Yes",
        onPress: () => {
          reset()
          setSelecting(true)
          Haptic.selectionAsync()
        }
      },
      {
        text: "No",
        onPress: () => {
          if (pausedInPrompt) {
            start()
          }
          Haptic.selectionAsync()
        }
      }
    ])
  }

  const pausePrompt = () => {
    pause()
    Alert.alert("Pausing", "Are you sure you want to pause the timer?", [
      {
        text: "Yes",
        onPress: () => {Haptic.selectionAsync()}
      },
      {
        text: "No",
        onPress: () => {start(); Haptic.selectionAsync()}
      }
    ])
  }


  // 1st state: Victory screen! Woohoo!
  if (confetti && victoryOption) {
    return (
      <Confetti sessionTime={sessionTime}/>
    )
  }

  // 2nd state: selecting the time
  if (isSelecting) {
    const {width, height} = Dimensions.get('window') 
    const timers = [...Array(25).keys()].map((i) => (i === 0 ? 1 : i * 5))
    const ITEM_SIZE = width * 0.38
    const ITEM_SPACING = (width - ITEM_SIZE) / 1.85
    return (
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >
      <SafeAreaView style={[styles.safe, {marginTop: 100}]}>
          <StatusBar style={theme.isDark ? 'light' : 'dark'} />
          <View style={{alignContent: 'center', alignItems:'center'}}>
            <Text style={[styles.title, {fontSize: 24, color: theme.text, paddingBottom: 20}]}>Please select a session time.</Text>
            <Text style={[styles.title, {fontSize: 16, color: theme.text, opacity: 0.5}]}>(Swipe if the text hasn't appeared)</Text>
            <Text style={[styles.title, {fontSize: 16, color: theme.text, opacity: 0.5, marginTop: 30}]}>format = hr:min</Text>
          </View>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 100,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {setSelecting(false); Haptic.notificationAsync()}}>
              <View
                style={styles.saveButton}
              />
            </TouchableOpacity>
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              top: height / 3,
              left: 0,
              right: 0,
              flex: 1,
            }}>
              <Animated.FlatList
              data={timers}
              keyExtractor={item => item.toString()}
              horizontal
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              onMomentumScrollEnd={ev => {
                const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE)
                setDurationSec(debugOption ? timers[index] : timers[index] * 60)
                setSessionTime(timers[index])
                playSound('timeSelect', soundOption, 0.5)
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: ITEM_SPACING
              }}
              style={{flexGrow: 0}}
              snapToInterval={ITEM_SIZE}
              renderItem={({item, index}) => {
                const inputRange = [
                      (index - 1) * ITEM_SIZE,
                      index * ITEM_SIZE,
                      (index + 1) * ITEM_SIZE
                    ]
                
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [.4, 1, .4]
                })
                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [.7, 1, .4]
                })
                return <View style={{width: ITEM_SIZE}}>
                    <Animated.Text style={[styles.time, {
                      fontSize: 65, 
                      opacity,
                      color: theme.text,
                      transform: [{
                        scale
                      }]
                      }]}>
                      {formatSELECT(item)}
                    </Animated.Text>
                  </View>
              }}
              />
            </View>
      </SafeAreaView>
    </LinearGradient>
  )
  }

  // 3rd state: the timer
  return (
    
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >

      <SafeAreaView style={styles.safe}>
        <StatusBar style={theme.isDark ? 'light' : 'dark'} />

        <HideableView
        visible={debugOption}
        inputText="[DEBUG MODE]"
        style={styles.header}
        textStyle={[styles.title, {color: theme.text, alignContent: "center", fontSize: 20}]}
        />

        <HideableView
        visible={encouragingLineOption}
        inputText={encouragement}
        style={styles.header}
        textStyle={[styles.title, 
          {color: theme.text, alignContent: "center", alignItems: 'center', fontSize: 20, marginBottom: 20}
        ]}
        />
        
        <View style={styles.timerWrap}>
          <Text style={[styles.time, {color: theme.textSoft, opacity: 0.4, fontSize:30}]}>{time}</Text>
          <Text style={[styles.time, {color: theme.textSoft, fontSize:48}]}>{stateTime}</Text>

          <ProgressButton
          size={200}
          progress={progress}
          glowColor={mode === "work" ? themes.common.orange : themes.common.green}
          background={theme.card}
          running={running}
          onPress={() => {
            Haptic.selectionAsync()
            if (running) {
              AggressiveEncouragementOption ? pausePrompt() : pause()
            }
            else {
              start()
            }
          }}
          />
          
          <Text style={[styles.title, {color: theme.text, fontSize: 16}]}>{mode === "work" ? BREAK_TEXT : WORK_TEXT}</Text>

          <Controls onStop={() => {exitPrompt(); Haptic.selectionAsync()}} />

          <Text style={[styles.title, 
            {fontSize: 16, color: theme.text, opacity: 0.5, marginTop: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}]}>
              Want to change the work/break times? See options!
              </Text>

          {/* <Text style={[styles.title, 
            {fontSize: 16, color: theme.text, opacity: 0.5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}]}>
              If the work/break value is too high, wiggle the slider around in options again. Sorry!
              </Text> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}  

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
    gap: 10
  },
  header: {
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  timerWrap: {
    marginTop: 6,
    alignItems: 'center',
    gap: 14
  },
  time: {
    fontWeight: '800',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center'
  },
  hint: {
    fontSize: 18
  },
  saveButton: {
    width: 100,
    height: 100,
    borderRadius: 80,
    backgroundColor: themes.common.orange
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 4
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.5,
    fontSize: 14
  }
})