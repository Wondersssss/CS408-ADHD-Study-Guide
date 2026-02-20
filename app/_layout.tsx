import React from 'react'
import {Stack} from 'expo-router'
import { ThemeProvider, useTheme } from '../src/theme/theme'
import TimeProvider from '../src/providers/TimeProvider'
import EncouragementProvider from '../src/providers/EncouragementProvider'
import SoundProvider from '../src/providers/soundOptionProvider'
import VictoryProvider from '../src/providers/victoryOptionProvider'
import { LinearGradient } from 'expo-linear-gradient'

const finalLayout = () => {
  return (
    <ThemeProvider>
      {RootLayout()}
    </ThemeProvider>
  )
}


const RootLayout = () => {
  const {theme} = useTheme()

  const headerColor = theme.isDark ? '#000000' : '#ffff'

  return (
      <ThemeProvider>
        <SoundProvider>
          <TimeProvider>
            <VictoryProvider>
              <EncouragementProvider>
                <Stack screenOptions={{headerShown: false}}>
                  <Stack.Screen name="(tabs)" options={{headerShown: false, headerStyle: {backgroundColor: headerColor}}}/>
                </Stack>
              </EncouragementProvider>
            </VictoryProvider>
          </TimeProvider>
        </SoundProvider>
      </ThemeProvider>
  )
}

export default finalLayout