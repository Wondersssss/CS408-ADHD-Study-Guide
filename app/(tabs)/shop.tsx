import { useContext, useEffect, useState } from "react"
import { useSoundEffects } from "../../src/hooks/useSoundEffects"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CurrencyContext } from "../../src/providers/CurrencyProvider"
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../src/theme/theme"
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SoundContext } from "../../src/providers/soundOptionProvider"
import { StatusBar } from "expo-status-bar"
import { AggressiveEncouragementContext } from "../../src/providers/AggressiveEncouragementProvider"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Haptic from 'expo-haptics'

type shopItemType = {
  id: number
  name: string
  gif_URL: string
  cost: number
  isBought: boolean
}

const Shop = () => {
  const {currency, setCurrency} = useContext(CurrencyContext)
  const {AggressiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const {soundOption} = useContext(SoundContext)
  const {playSound} = useSoundEffects()
  const {theme} = useTheme()


  const shopItems = [
    {
      id: Math.random(),
      name: "Hey!",
      gif_URL: require("../../assets/animations/Hey.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Home Element",
      gif_URL: require("../../assets/animations/Home element.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Infinity",
      gif_URL: require("../../assets/animations/loading.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "180-Style",
      gif_URL: require("../../assets/animations/Spin.json"),
      cost: 200,
      isBought: false
    },
    {
      id: Math.random(),
      name: "Our Vision",
      gif_URL: require("../../assets/animations/Remix of Our vision.json"),
      cost: 200,
      isBought: false
    },
  ]

  let boughtList = []
   useEffect(() => {
    const getItemStatuses = async() => {
      try {
        for (let i = 0; i < shopItems.length; i++) {
          let itemStatus = await AsyncStorage.getItem(shopItems[i].id.toString())
          if (itemStatus !== null) {
            shopItems[i].isBought = Boolean(itemStatus)
          }
          }
        }
      catch (error) {
        console.log(error)
      }
    }
    getItemStatuses()
  }, [])

  const buyItem = async(id: number) => {
    try {
      const newItems = shopItems.map((item) => {
        let currencyTemp: number = -999
        if (item.id === id) {
          if (item.cost <= currency) {
            currencyTemp = currency - item.cost
            item.isBought = true
            playSound("itemBuy", soundOption, 0.5)
            console.log("Transaction for " +  item.id + " succeeded!")
          }
          else {
            let alertMessage = AggressiveEncouragementOption ? "You don't have enough currency. You gotta earn some more coins!" :
                                                      "You don't have enough currency for this."
            Alert.alert("Error", alertMessage)
            console.log("Transaction for " +  item.id + " failed!")
          }
          setCurrency(currencyTemp === -999 ? currency : currencyTemp)
        }
        return item.isBought
      })
      
      await AsyncStorage.setItem(id.toString(), JSON.stringify(newItems))
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
        <Text style={[styles.itemText, {color: theme.text}]}>{item.name}</Text>
        <LottieView
        autoPlay
        style={styles.animation}
        source={item.gif_URL}
        loop
        />
        <Text style={[styles.itemText, {color: theme.text}]}>{item.cost}</Text>
        <TouchableOpacity style={item.isBought ? styles.boughtButton: styles.notBoughtButton} onPress={async() => {
          Haptic.selectionAsync()
          if (!item.isBought) {
            buyItem(item.id)
          }
          else {
            Alert.alert("Error", "You already have this animation!")
          }
          }}>
          <Text style={styles.itemText}>Purchase</Text>
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
        <View style={styles.header}>
          <Text style={{fontSize: 20, fontWeight: '600', color: theme.text}}>{currency}</Text>
          <Ionicons name="cash-outline" size={24} color={theme.text}/>
        </View>
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
  header: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#dedede'
  },
  itemInfoContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center'
  },
  itemText: {
    fontSize: 16,
    color: '#ffff',
    fontWeight: '600'
  },
  animation: {
    width: 300,
    height: 300,
  },
  notBoughtButton: {
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
  },
  boughtButton: {
    backgroundColor: '#2d2096',
    padding: 8,
    borderRadius: 10,
    opacity: 0.8
  },
})

