import React from 'react'
import {Stack} from 'expo-router'
import { ThemeProvider, useTheme } from '../src/theme/theme'
import TimeProvider from '../src/providers/TimeProvider'
import EncouragementProvider from '../src/providers/EncouragementProvider'
import SoundProvider from '../src/providers/soundOptionProvider'
import VictoryProvider from '../src/providers/victoryOptionProvider'
import CurrencyProvider from '../src/providers/CurrencyProvider'
import { LinearGradient } from 'expo-linear-gradient'
import AggressiveEncouragementProvider from '../src/providers/AggressiveEncouragementProvider'

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
      <AggressiveEncouragementProvider>
        <ThemeProvider>
          <SoundProvider>
            <TimeProvider>
              <VictoryProvider>
                <EncouragementProvider>
                  <CurrencyProvider>
                    <Stack screenOptions={{headerShown: false}}>
                      <Stack.Screen name="(tabs)" options={{headerShown: false, headerStyle: {backgroundColor: headerColor}}}/>
                    </Stack>
                  </CurrencyProvider>
                </EncouragementProvider>
              </VictoryProvider>
            </TimeProvider>
          </SoundProvider>
        </ThemeProvider>
      </AggressiveEncouragementProvider>
  )
}

export default finalLayout