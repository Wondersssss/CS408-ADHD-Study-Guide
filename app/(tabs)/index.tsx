import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState }  from 'react'
import { useTheme } from '../../src/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native'
import { AggressiveEncouragementContext } from '../../src/providers/AggressiveEncouragementProvider'

const index = () => {
  const {theme} = useTheme()
  const {AggressiveEncouragementOption, setAggresiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const [availableItems, setAvailableItems] = useState<number[]>([])
  const [randomItemURL, setRandomItemURL] = useState('')


  const ITEMS = [
    {
      id: 0,
      gif_URL: require("../../assets/animations/Hey.json"),
    },
    {
      id: 1,
      gif_URL: require("../../assets/animations/Home element.json"),
    },
    {
      id: 2,
      gif_URL: require("../../assets/animations/loading.json"),
    },
    {
      id: 3,
      gif_URL: require("../../assets/animations/Spin.json"),
    },
    {
      id: 4,
      gif_URL: require("../../assets/animations/Remix of Our vision.json"),
    },
  ]

  useEffect(() => {
  const getRandomItem = async () => {
    const items: number[] = []

    for (let i = 0; i < 5; i++) {
      const asyncItem = await AsyncStorage.getItem(`item_${i}`)
      if (asyncItem === "true") {
        items.push(i)
      }
    }

    setAvailableItems(items)

    if (items.length !== 0) {
      const randomIndex = items[Math.floor(Math.random() * items.length)]
      setRandomItemURL(ITEMS[randomIndex].gif_URL)
    }
  }

  getRandomItem()
}, [])

  const RandomGIF = () => {
    if (availableItems.length === 0) {
      const message = AggressiveEncouragementOption ? 
      "You don't have any animations yet, go earn some!" : 
      "You don't have any animations yet."


      return (
        <Text style={[styles.title, {color: theme.text, alignContent: "center", fontSize: 16}]}>{message}</Text>
      )
    }

    return (
      <LottieView
      autoPlay
      style={styles.animation}
      source={randomItemURL}
      loop
      />
    )
  }


  return (
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >
      <SafeAreaView style={[styles.safe, {backgroundColor: theme.bg}]}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.text, alignContent: "center", fontSize: 40}]}>Welcome back!</Text>
        </View>

        <View style={styles.animationView}>
          <RandomGIF/>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 100
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  footer: {
    marginTop: 24,
    alignItems: 'center'
  },
  animation: {
    width: 500,
    height: 500,
  },
  animationView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})