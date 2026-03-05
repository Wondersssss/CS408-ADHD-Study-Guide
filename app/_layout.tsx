import React from 'react'
import {Stack} from 'expo-router'
import { ThemeProvider} from '../src/theme/theme'
import TimeProvider from '../src/providers/TimeProvider'
import SoundProvider from '../src/providers/soundOptionProvider'
import VictoryProvider from '../src/providers/victoryOptionProvider'
import CurrencyProvider from '../src/providers/CurrencyProvider'
import AggressiveEncouragementProvider from '../src/providers/AggressiveEncouragementProvider'
import EncouragingLineProvider from '../src/providers/EncouragingLineProvider'
import DebugProvider from '../src/providers/DebugProvider'

const finalLayout = () => {
  return (
      <DebugProvider>
        <AggressiveEncouragementProvider>
          <ThemeProvider>
            <SoundProvider>
              <TimeProvider>
                <VictoryProvider>
                  <EncouragingLineProvider>
                    <CurrencyProvider>
                      <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                      </Stack>
                    </CurrencyProvider>
                  </EncouragingLineProvider>
                </VictoryProvider>
              </TimeProvider>
            </SoundProvider>
          </ThemeProvider>
        </AggressiveEncouragementProvider>
      </DebugProvider>
  )
}

export default finalLayout