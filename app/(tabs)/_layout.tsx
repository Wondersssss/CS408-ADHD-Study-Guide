import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabLayout = () => { // Temporary tab bar atm
  return (                // may use React Navigation once functionality is complete
    <Tabs>

      <Tabs.Screen 
      name="list" 
      options={({title: "To-Do", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='list-outline'
        />
      )})}/>
      
      <Tabs.Screen 
      name="timer" 
      options={({title: "Timer", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='timer-outline'
        />
      )})}/>
      
      <Tabs.Screen 
      name="index" 
      options={({title: "Home", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='home-outline'
        />
      )})}/>
      
      <Tabs.Screen 
      name="shop" 
      options={({title: "Shop", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='bag-outline'
        />
      )})}/>
      
      <Tabs.Screen 
      name="options" 
      options={({title: "Options", tabBarIcon: () => (
        <Ionicons
        size={24}
        name='settings-outline'
        />
      )})}/>
    </Tabs>
  )
}

export default TabLayout