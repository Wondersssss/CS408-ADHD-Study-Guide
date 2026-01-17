import { useMemo, useState } from "react";
import { ThemeProvider, useTheme, themes } from "../../src/theme/theme";
import usePomodoro from "../../src/hooks/usePomodoro";
import { formatMMSS } from "../../src/utils/format";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ProgressButton from "../../src/components/ProgressButton";
import Controls from "../../src/components/TimerControls";

export default function timer () {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

function AppInner() {
  const {theme, toggle} = useTheme()
  const [durationSec, setDurationSec] = useState(25 * 60)
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

        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.text}]}>
             Time yourself, You can do this!!
          </Text>
        </View>

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
          <Controls visible={running} onPause={pause} onStop={reset} />
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
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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