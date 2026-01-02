import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const options = () => {
  return (
    <View style={styles.container}>
      <Text>options</Text>
    </View>
  )
}

export default options

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
})