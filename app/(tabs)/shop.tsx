import { useContext, useEffect, useState } from "react"
import { useSoundEffects } from "../../src/hooks/useSoundEffects"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CurrencyContext } from "../../src/providers/CurrencyProvider"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../src/theme/theme"
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SoundContext } from "../../src/providers/soundOptionProvider"
import { StatusBar } from "expo-status-bar"
import { AggressiveEncouragementContext } from "../../src/providers/AggressiveEncouragementProvider"

type shopItemType = {
  id: number
  name: string
  gif_URL: string
  cost: number
  isBought: boolean
}

const Shop = () => {
  const [items, setItems] = useState<shopItemType[]>([])
  const [oldItems, setOldItems] = useState<shopItemType[]>([])
  const [bought, setBought] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const {currency, setCurrency} = useContext(CurrencyContext)
  const {AggressiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const {soundOption} = useContext(SoundContext)
  const {playSound} = useSoundEffects()
  const {theme} = useTheme()

  const shopItems = [
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Test",
      gif_URL: require("../../assets/animations/Confetti.json"),
      cost: 200,
      isBought: false
    },
  ]

  useEffect(() => {
    const getItems = async() => {
      try {
        const items = await AsyncStorage.getItem('item')
        if (items !== null) {
          setItems(JSON.parse(items))
          setOldItems(JSON.parse(items))
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getItems()
  }, [])

  const buyItem = async(id: number) => {
    try {
      const newItems = items.map((item) => {
        if (item.id === id) {
          if (item.cost > currency) {
            item.isBought = true
            playSound("itemBuy", soundOption, 0.5)
          }
          else {
            let alertMessage = AggressiveEncouragementOption ? "You don't have enough currency. You gotta earn some more coins!" :
                                                      "You don't have enough currency for this."
            alert(alertMessage)
            playSound("soundFail", soundOption)
          }
        }
        return item
      })
      
      await AsyncStorage.setItem('item', JSON.stringify(newItems))
      setItems(newItems)
      setOldItems(newItems)
    }
    catch (error) {
      console.log(error)
    }
  } 

  const onSearch = (query: string) => {
    if (query == '') {
      setItems(oldItems)
    }
    else {
      const filteredItems = items.filter((item) => 
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      setItems(filteredItems)
    }
  }

  useEffect(() => {
    onSearch(searchQuery)
  }, [searchQuery])

  const shopItem = ({
    item,
    buyItem
    } : {
    item: shopItemType,
    buyItem: (id: number) => void
  }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <LottieView
        autoPlay
        style={styles.animation}
        source={item.gif_URL}
        loop
        />
        <Text style={styles.itemText}>{item.cost}</Text>
        <TouchableOpacity onPress={() => {buyItem(item.id)}}>
          <Text style={styles.itemText}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  )


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />

    </SafeAreaView>
  )


}

export default Shop 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {

  },
  itemInfoContainer: {

  },
  itemText: {

  },
  animation: {

  }
})

