import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
})