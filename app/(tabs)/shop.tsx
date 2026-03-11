import { useContext, useEffect, useState } from "react"
import { useSoundEffects } from "../../src/hooks/useSoundEffects"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CurrencyContext } from "../../src/providers/CurrencyProvider"
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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
  gif_URL: any
  cost: number
  isBought: boolean
}

const INITIAL_ITEMS: Omit<shopItemType, 'isBought'>[] = [
  {
    id: 1,
    name: "Hey!",
    gif_URL: require("../../assets/animations/Hey.json"),
    cost: 200,
  },
  {
    id: 2,
    name: "Home Element",
    gif_URL: require("../../assets/animations/Home element.json"),
    cost: 200,
  },
  {
    id: 3,
    name: "Infinity",
    gif_URL: require("../../assets/animations/loading.json"),
    cost: 200,
  },
  {
    id: 4,
    name: "180-Style",
    gif_URL: require("../../assets/animations/Spin.json"),
    cost: 200,
  },
  {
    id: 5,
    name: "Our Vision",
    gif_URL: require("../../assets/animations/Remix of Our vision.json"),
    cost: 200,
  },
]

const Shop = () => {
  const {currency, setCurrency} = useContext(CurrencyContext)
  const {AggressiveEncouragementOption} = useContext(AggressiveEncouragementContext)
  const {soundOption} = useContext(SoundContext)
  const {playSound} = useSoundEffects()
  const {theme} = useTheme()
  
  const [shopItems, setShopItems] = useState<shopItemType[]>(
    INITIAL_ITEMS.map(item => ({ ...item, isBought: false }))
  )

  const getItemStatus = async(id: number): Promise<boolean> => {
    try {
      const itemStatus = await AsyncStorage.getItem(`item_${id}`)
      return itemStatus === 'true'
    }
    catch(error) {
      console.log("Error getting item status:", error)
      return false
    }
  }

  useEffect(() => {
    const loadItemStatuses = async() => {
      try {
        const updatedItems = await Promise.all(
          shopItems.map(async (item) => {
            const isBought = await getItemStatus(item.id)
            return { ...item, isBought }
          })
        )
        setShopItems(updatedItems)
      } catch (error) {
        console.log("Error loading items:", error)
      }
    }
    loadItemStatuses()
  }, [])

  const buyItem = async(id: number) => {
    try {
      const item = shopItems.find(item => item.id === id)
      if (!item) return

      if (item.cost <= currency) {
        const newCurrency = currency - item.cost
        setCurrency(newCurrency)
        
        setShopItems(prevItems =>
          prevItems.map(i =>
            i.id === id ? { ...i, isBought: true } : i
          )
        )
        
        playSound("itemBuy", soundOption, 0.5)
        
        await AsyncStorage.setItem("currency", JSON.stringify(newCurrency))
        await AsyncStorage.setItem(`item_${id}`, "true")
      }
      else {
        const alertMessage = AggressiveEncouragementOption 
          ? "You don't have enough currency. You gotta earn some more coins!"
          : "You don't have enough currency for this."
        Alert.alert("Error", alertMessage)
      }
    }
    catch (error) {
      console.log("Error buying item:", error)
      Alert.alert("Error", "Failed to purchase item. Please try again.")
    }
  } 

  const ShopItem = ({ item }: { item: shopItemType }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.card }]}>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <LottieView
          autoPlay
          style={styles.animation}
          source={item.gif_URL}
          loop
        />
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.itemText}>{item.cost}</Text>
          <Ionicons name="cash-outline" size={24} color='#000000'/>
        </View>
        <TouchableOpacity 
          style={item.isBought ? styles.boughtButton : styles.notBoughtButton} 
          onPress={async() => {
            Haptic.selectionAsync()
            if (!item.isBought) {
              Alert.alert("Purchase", `Are you sure you want to buy ${item.name}?`, [
                {
                  text: "Yes",
                  onPress: () => buyItem(item.id)
                },
                {text: "No", style: "cancel"}
              ])
            }
            else {
              Alert.alert("Info", "You already own this animation!")
            }
          }}
          disabled={item.isBought}
        >
          <Text style={styles.purchaseButtonText}>
            {item.isBought ? "Owned" : "Purchase"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <LinearGradient
      colors={theme.bgGradient}
      start={{x: 0.2, y: 0.1}}
      end={{x: 0.9, y: 1}}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={{fontSize: 20, fontWeight: '600', color: theme.text}}>
            {currency}
          </Text>
          <Ionicons name="cash-outline" size={24} color={theme.text}/>
        </View>
        <StatusBar style={theme.isDark ? 'light' : 'dark'} />
        <FlatList
          data={shopItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <ShopItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Shop 

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#000000',
    fontWeight: '600'
  },
  purchaseButtonText: {
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