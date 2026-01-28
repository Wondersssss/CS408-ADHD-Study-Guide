import { useContext, useMemo, useState } from "react";
import { ThemeProvider, useTheme, themes } from "../../src/theme/theme";
import usePomodoro from "../../src/hooks/usePomodoro";
import { formatMMSS } from "../../src/utils/format";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ProgressButton from "../../src/components/ProgressButton";
import Controls from "../../src/components/TimerControls";
import { randomNumberGenerator } from "../../src/utils/randomNumberGenerator";
import BreakControls from "../../src/components/BreakControls";
import TimeProvider, { TimeContext } from "../../src/hooks/TimeProvider";
import EncouragementProvider, { EncouragementContext } from "../../src/hooks/EncouragementProvider";
import HideableView from "../../src/components/HideableView";

export default function timer () {
  return (
  <AppInner />
  )
}

const quoteList = [
    "Why don't you time yourself? No pressure though.",
    "Are ya ready to get studying? You got this!! Absolutely!",
    "Don't feel bad if you're not up to it, breaks are good!",
    "Remember to not overwork yourself!",
    "I believe in you :)",
    "I think you're super smart, so you definitely got this >:)",
    "I'm proud of your journey."
]

const encouragement = quoteList[randomNumberGenerator(quoteList)]

function AppInner() {

  const {theme, toggle} = useTheme()
  const {workTime, setWorkTime, breakTime, setBreakTime} = useContext(TimeContext)
  const {encouraged, setEncouragement} = useContext(EncouragementContext)
  const [durationSec, setDurationSec] = useState(workTime * 60)

  //BASE TIMER  
  const {secondsLeft, running, progress, start, pause, reset} = usePomodoro({
    durationSec,
    onFinish: () => {}
  })

  const time = useMemo(() => formatMMSS(secondsLeft), [secondsLeft])

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
          <Text style={[styles.time, {color: theme.textSoft}]}>{time}</Text>

          <ProgressButton
          size={200}
          progress={progress}
          glowColor={themes.common.orange}
          background={theme.card}
          running={running}
          onPress={() => (running ? pause() : start())}
          onLongPress={reset}
          />
          <Text style={[styles.title, {color: theme.text, fontSize: 16}]}>Until break:</Text>
          <Text style={[styles.time, {color: theme.textSoft}]}>{workTime}</Text>



          <Controls visible={running} onPause={pause} onStop={reset} />
          {/* <BreakControls visible={onBreak} onBreakStop={breakStop}/>*/}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.hint, {color: themes.common.orange}]}>
            Hold the button to reset.
          </Text>
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
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center'
  },
  hint: {
    fontSize: 18
  }
})