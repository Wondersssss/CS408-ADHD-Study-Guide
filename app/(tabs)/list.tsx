import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'

const AssignmentList = () => {
  const toDoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: false
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false
    }
  ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name='folder' size={36} color={"#333"}/> 
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name='search'size={24} color={'#333'}/> 
        <TextInput placeholder='Search...' style={styles.searchInput} clearButtonMode='always'/>
      </View>

      <FlatList
      data={toDoData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.toDoContainer}>
          <View style={styles.toDoInfoContainer}>
            <Checkbox value={item.isDone}/>
            <Text style={styles.toDoText}>{item.title}</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='trash' size={24} color={'red'}/>
          </TouchableOpacity>
        </View>
      )}
      />

      <KeyboardAvoidingView style={styles.footer} behavior='padding'>
        <TextInput placeholder='Add new' style={styles.newToDoInput}/>
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
          <Ionicons name='add' size={34} color={'#fff'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AssignmentList

const styles = StyleSheet.create({
  // TODO: CHANGE COLOURS TO THEMES
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
      header: {
    marginBottom: 20
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  toDoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20
  },
  toDoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  toDoText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newToDoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333'
  },
  addButton: {
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
    marginLeft: 28
  }
})