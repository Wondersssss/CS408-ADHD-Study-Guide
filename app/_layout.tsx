import React from 'react'
import {Stack} from 'expo-router'
import { ThemeProvider } from '../src/theme/theme'
import TimeProvider from '../src/option_states/TimeProvider'
import EncouragementProvider from '../src/option_states/EncouragementProvider'
import SoundProvider from '../src/option_states/soundOptionProvider'
import VictoryProvider from '../src/option_states/victoryOptionProvider'

const RootLayout = () => {
  return (
    <SoundProvider>
      <TimeProvider>
        <VictoryProvider>
          <EncouragementProvider>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
          </EncouragementProvider>
        </VictoryProvider>
      </TimeProvider>
    </SoundProvider>
  )
}

export default RootLayout