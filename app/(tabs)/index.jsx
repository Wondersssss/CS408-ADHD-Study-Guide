import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useTheme } from '../../src/theme/theme'
import { LinearGradient } from 'expo-linear-gradient'


const index = () => {
  const {theme} = useTheme()



  return (
    <LinearGradient
    colors={theme.bgGradient}
    start={{x: 0.2, y: 0.1}}
    end={{x: 0.9, y: 1}}
    style={[styles.container, {backgroundColor: theme.bg}]}
    >
      
    </LinearGradient>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column"
    },
    topmessage: {
      backgroundColor: "#5edd8bff",
      color: "#ffff",
      fontSize: 20,
      padding: 20
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1,
      resizeMode: "cover",
    }
})