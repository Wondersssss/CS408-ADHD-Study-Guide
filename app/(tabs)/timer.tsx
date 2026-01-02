import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const timer = () => {
  return (
    <View style={styles.container}>
      <Text>timer</Text>
    </View>
  )
}

export default timer

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
})