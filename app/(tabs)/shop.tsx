import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const shop = () => {
  return (
    <View style={styles.container}>
      <Text>shop</Text>
    </View>
  )
}

export default shop

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
})