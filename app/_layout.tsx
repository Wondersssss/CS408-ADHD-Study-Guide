import React from 'react'
import {Stack} from 'expo-router'
import { ThemeProvider } from '../src/theme/theme'
import TimeProvider from '../src/hooks/TimeProvider'
import EncouragementProvider from '../src/hooks/EncouragementProvider'

const RootLayout = () => {
  return (
  <ThemeProvider>
    <TimeProvider>
      <EncouragementProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
      </EncouragementProvider>
    </TimeProvider>
  </ThemeProvider>
  )
}

export default RootLayout