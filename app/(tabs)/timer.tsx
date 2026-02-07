import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTheme, themes } from "../../src/theme/theme";
import usePomodoro from "../../src/hooks/usePomodoro";
import { formatMMSS } from "../../src/utils/format";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ProgressButton from "../../src/components/ProgressButton";
import Controls from "../../src/components/TimerControls";
import { randomNumberGenerator } from "../../src/utils/randomNumberGenerator";
import { TimeContext } from "../../src/hooks/TimeProvider";
import { EncouragementContext } from "../../src/hooks/EncouragementProvider";
import HideableView from "../../src/components/HideableView";
import { useSoundEffects } from "../../src/hooks/useSoundEffects";
import Confetti from "../../src/components/Confetti";

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
  const {theme, toggle} = useTheme()
  const {workTime, setWorkTime, breakTime, setBreakTime} = useContext(TimeContext)
  const {encouraged, setEncouragement} = useContext(EncouragementContext)
  const [durationSec, setDurationSec] = useState<number>(0)
  const [isSelecting, setSelecting] = useState<boolean>(true)
  const [confetti, setConfetti] = useState<boolean>(false)
  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setWorkTime(workTime * 60)
    setBreakTime(breakTime * 60)
  }, [setBreakTime, setWorkTime])

  const {totalSecondsLeft, running, progress, start, pause, reset, mode, stateTimeLeft} = usePomodoro({
    durationSec,
    onFinish: () => {
      playSound("timerWin")
      setConfetti(true)
      setSelecting(true)
      setTimeout(() => {
        setConfetti(false)
      }, 5000)
    }, 
    workTime,
    breakTime,
    onStateChange: () => {
      if (mode === "work") playSound("workWin", 0.5)
    }
  })

  const time = useMemo(() => formatMMSS(totalSecondsLeft), [totalSecondsLeft])
  const stateTime = useMemo(() => formatMMSS(stateTimeLeft), [stateTimeLeft])


  // 1st state: Victory screen! Woohoo!
  if (confetti && encouraged) {
    return (
      <Confetti visible={true}/>
    )
  }

  // 2nd state: selecting the time
  if (isSelecting) {
    const {width, height} = Dimensions.get('window') 
    const timers = [...Array(25).keys()].map((i) => (i === 0 ? 1 : i * 5))
    const ITEM_SIZE = width * 0.38
    const ITEM_SPACING = (width - ITEM_SIZE) / 1.5
    return (
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >
      <SafeAreaView style={styles.safe}>
          <Text style={[styles.title, {fontSize: 24}]}>Please select a time for the session.</Text>
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
              onPress={() => {setSelecting(false)}}>
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
                {useNativeDriver: true}
              )}
              onMomentumScrollEnd={ev => {
                const index = Math.floor(ev.nativeEvent.contentOffset.x / ITEM_SIZE)
                setDurationSec(timers[index] * 60)
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
                      fontSize: 80, 
                      opacity,
                      transform: [{
                        scale
                      }]
                      }]}>
                      {item}
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
        visible={encouraged}
        inputText={encouragement}
        style={styles.header}
        textStyle={[styles.title, {color: theme.text, alignContent: "center", fontSize: 20}]}
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
          onPress={() => (running ? pause() : start())}
          onLongPress={reset}
          />
          
          <Text style={[styles.title, {color: theme.text, fontSize: 16}]}>{mode === "work" ? BREAK_TEXT : WORK_TEXT}</Text>

          <Controls visible={running} onPause={pause} onStop={reset} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.hint, {color: themes.common.orange}]}>
            Hold the button to reset.
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable
            onPress={() => {
              reset
              setSelecting(true)
            }}
            style={({pressed}) => [
                styles.btn,
                {
                    backgroundColor: theme.card,
                    opacity: pressed ? 0.9 : 1
                }
            ]}
            >
                <Text style={[styles.label, {color: "#121217"}]}>Select Time (resets timer)</Text>
          </Pressable>
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
    paddingHorizontal: 20
  },
  header: {
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
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