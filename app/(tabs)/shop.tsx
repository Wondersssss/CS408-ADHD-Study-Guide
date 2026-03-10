import { useContext, useEffect, useState } from "react"
import { useSoundEffects } from "../../src/hooks/useSoundEffects"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CurrencyContext } from "../../src/providers/CurrencyProvider"
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../src/theme/theme"
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SoundContext } from "../../src/providers/soundOptionProvider"
import { StatusBar } from "expo-status-bar"
import { AggressiveEncouragementContext } from "../../src/providers/AggressiveEncouragementProvider"
import { LinearGradient } from "expo-linear-gradient"

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
            playSound("toDoAdd", soundOption, 0.5)
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

  const ShopItem = ({
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
        <Text style={[styles.itemText, {color: theme.text}]}>{item.cost}</Text>
        <TouchableOpacity onPress={() => {buyItem(item.id)}}>
          <Text style={[styles.itemText, {color: theme.text}]}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  )


  return (
    <LinearGradient
        colors={theme.bgGradient}
        start={{x: 0.2, y: 0.1}}
        end={{x: 0.9, y: 1}}
        style={[styles.container, {backgroundColor: theme.bg}]}
        >
      <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
        <StatusBar style={theme.isDark ? 'light' : 'dark'} />
        <FlatList
        data={[...shopItems]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ShopItem item={item} buyItem={buyItem}/>
        )}
        scrollEnabled={true}
        />
      </SafeAreaView>
    </LinearGradient>
  )


}

export default Shop 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#4c0000'
  },
  itemInfoContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center'
  },
  itemText: {
    fontSize: 16,
  },
  animation: {
    width: 300,
    height: 300,
  }
})

