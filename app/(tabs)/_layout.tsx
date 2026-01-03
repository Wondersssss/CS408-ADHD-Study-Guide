import React from 'react'
import {Tabs} from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="list" options={({title: "To-Do"})}/>
      <Tabs.Screen name="timer" options={({title: "Timer"})}/>
      <Tabs.Screen name="index" options={({title: "Home"})}/>
      <Tabs.Screen name="shop" options={({title: "Shop"})}/>
      <Tabs.Screen name="options" options={({title: "Options"})}/>
    </Tabs>
  )
}

export default TabLayout