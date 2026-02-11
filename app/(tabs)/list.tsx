import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import ToDoItem from '../../src/components/toDoItem'

type toDoType = {
  id: number
  title: string
  time: string
  isDone: boolean
}

const AssignmentList = () => {
  const toDoData = [
    {
      id: 1,
      title: "Todo 1",
      time: '17/02/2021',
      isDone: false
    },
    {
      id: 2,
      title: "Todo 2",
      time: '17/02/2021',
      isDone: false
    },
    {
      id: 3,
      title: "Todo 3",
      time: '17/02/2021',
      isDone: false
    },
    {
      id: 4,
      title: "Todo 4",
      time: '17/02/2021',
      isDone: false
    },
    {
      id: 5,
      title: "Todo 5",
      time: '17/02/2021',
      isDone: false
    }
  ]

  const [todos, setToDos] = useState<toDoType[]>(toDoData)
  const [toDoText, setToDoText] = useState<string>('')
  const [toDoTime, setToDoTime] = useState<string>('')

  const addToDo = () => {
    const newToDo = {
      id: Math.random(),
      title: toDoText,
      isDone: false
    }
    todos.push(newToDo)
    setToDos(todos)
    setToDoText('')
  }


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
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <ToDoItem todo={item} />
      )}
      />

      <KeyboardAvoidingView style={styles.footer} behavior='padding' keyboardVerticalOffset={100}>
        <TextInput placeholder='Task' value={toDoText} style={styles.newToDoInput} onChangeText={(text) => {setToDoText(text)}}/>
        <TextInput placeholder='Due Date' style={styles.newToDoInput}/>
        <TouchableOpacity onPress={() => {addToDo()}} style={styles.addButton}>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newToDoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
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