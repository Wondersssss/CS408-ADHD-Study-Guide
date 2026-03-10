import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../src/theme/theme'

// temporary tab bar atm but is very functional. I maaaay do React Navigation down the line but shouldn't be necessary
// considering functionality comes first.

const TabLayout = () => {
  const {theme} = useTheme()

  return (                
    <Tabs screenOptions={{tabBarStyle: {backgroundColor: theme.bg}, 
                          headerTitleContainerStyle: {backgroundColor: theme.bg}, 
                          headerStyle: {backgroundColor: theme.bg},
                          headerTitleStyle: {color: theme.text},
                          header: () => {return null}}}>
      <Tabs.Screen 
      name="list" 
      options={({title: "To-Do", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='list-outline'
        color={theme.text}
        />
      )})}/>
      
      <Tabs.Screen 
      name="timer" 
      options={({title: "Timer", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='timer-outline'
        color={theme.text}
        />
      )})}/>
      
      <Tabs.Screen 
      name="index" 
      options={({title: "Home", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='home-outline'
        color={theme.text}
        />
      )})}/>
      
      <Tabs.Screen 
      name="shop" 
      options={({title: "Shop", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='bag-outline'
        color={theme.text}
        />
      )})}/>
      
      <Tabs.Screen 
      name="options" 
      options={({title: "Options", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='settings-outline'
        color={theme.text}
        />
      )})}/>
    </Tabs>
  )
}

export default TabLayout
