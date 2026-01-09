import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'


const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topmessage}>Welcome (name)! What do you want to do?</Text>
      <Image
      style={styles.image}
      source="https://picsum.photos/200/300"
      contentFit='cover'
      />
    </View>
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