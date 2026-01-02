import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AssignmentList = () => {
  return (
    <View style={styles.container}>
      <Text>list</Text>
    </View>
  )
}

export default AssignmentList

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
})