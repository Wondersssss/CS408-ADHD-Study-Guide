import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dayChecker } from '../../src/utils/dayChecker'
import { useSoundEffects } from '../../src/hooks/useSoundEffects'

type toDoType = {
  id: number
  title: string
  time: string
  dateObject: Date
  isDone: boolean
}

const AssignmentList = () => {
  const [todos, setToDos] = useState<toDoType[]>([])
  const [toDoText, setToDoText] = useState<string>('')
  const [toDoTime, setToDoTime] = useState<string>('')
  const [date, setDate] = useState(new Date()) 
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [oldToDos, setOldToDos] = useState<toDoType[]>([])
  const {playSound} = useSoundEffects()

  useEffect(() => {
    const getToDos = async() => {
      try {
        const toDos = await AsyncStorage.getItem('todo')
        if (toDos !== null) {
          setToDos(JSON.parse(toDos))
          setOldToDos(JSON.parse(toDos))
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getToDos()
  }, [])


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setToDoTime(fDate)
  }

  const addToDo = async() => {
    try {
      const currentDate = new Date()
      if (currentDate > date) {
        alert("You cannot assign a task in the past, please try again.")
      }
      else if (toDoText === "") {
        alert("Task cannot be empty, please try again.")
      }
      else if (toDoTime === "") {
        // shouldn't occur but will keep it just in case
        alert("Task needs to have a time, please try again.")
      }
      else {
        const newToDo = {
          id: Math.random(),
          title: toDoText,
          time: toDoTime,
          dateObject: date, // only here for the different toDo colours
          isDone: false
        }
        todos.push(newToDo)
        setToDos(todos)
        setOldToDos(todos)
        await AsyncStorage.setItem('todo', JSON.stringify(todos))
        setToDoText('')
        Keyboard.dismiss()
        playSound("toDoAdd", 0.5)
      }
    }
    catch (error) {
      console.log(error)
      playSound("soundFail")
    }
  }

  const deleteToDo = async(id: number) => {
    try {
      const newToDos = todos.filter((todo) => todo.id !== id)
      await AsyncStorage.setItem('todo', JSON.stringify(newToDos))
      setToDos(newToDos)
      setOldToDos(newToDos)
      playSound("toDoTrash", 0.5)
    }
    catch (error) {
      console.log(error)
      playSound("soundFail")
    }
  }

  const handleDone = async(id: number) => {
    try {
      const newToDos = todos.map((todo) => {
        if (todo.id == id) {
          todo.isDone = !todo.isDone
        }
        return todo
      })
      await AsyncStorage.setItem('todo', JSON.stringify(newToDos))
      setToDos(newToDos)
      setOldToDos(newToDos)
    }
    catch (error) {
      console.log(error)
    }
  }

  const onSearch = (query: string) => {
    if (query == '') {
      setToDos(oldToDos)
    }
    else {
      const filteredTodos = todos.filter((todo) => 
      todo.title.toLowerCase().includes(query.toLowerCase())
      ) 
    setToDos(filteredTodos)
    }
  }

  useEffect(() => {
    onSearch(searchQuery)
  }, [searchQuery])

  const ToDoItem = ({
    todo,
    deleteToDo,
    handleTodo,
    } : {
    todo: toDoType, 
    deleteToDo: (id: number) => void,
    handleTodo: (id: number) => void,
  }) => (
      <View style={[styles.toDoContainer, {backgroundColor: dayChecker(todo.dateObject, true)}]}>
          <View style={styles.toDoInfoContainer}>
          <Checkbox value={todo.isDone} color={todo.isDone ? '#4630EB' : undefined} onValueChange={() => {handleTodo(todo.id)}}/>
          <Text style={[styles.toDoText, {color: dayChecker(todo.dateObject, false)}]}>{todo.title}</Text>
          </View>
          <Text style={[styles.toDoText, {fontWeight: '700', color: dayChecker(todo.dateObject, false), marginRight: 20}]}>{todo.time}</Text>
          <TouchableOpacity onPress={() => {deleteToDo(todo.id)}}>
          <Ionicons name='trash' size={24} color={dayChecker(todo.dateObject, false)}/>
          </TouchableOpacity>
      </View>
  )


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchBar}>
        <Ionicons name='search'size={24} color={'#333'}/> 
        <TextInput 
        placeholder='Search...' 
        style={styles.searchInput} 
        clearButtonMode='always' 
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <ToDoItem todo={item} deleteToDo={deleteToDo} handleTodo={handleDone}/>
      )}
      />

      <KeyboardAvoidingView style={styles.footer} behavior='padding' keyboardVerticalOffset={100}>
        <TextInput placeholder='Task' value={toDoText} style={styles.newToDoInput} onChangeText={(text) => {setToDoText(text)}}/>

        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        display="default"
        onChange={onDateChange}
        />
        
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
  },
  toDoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20
  },
  toDoInfoContainer: {
    flexDirection: 'row',
    flexShrink: 1,
    gap: 10,
    marginRight: 60,
    alignItems: 'center'
  },
  toDoText: {
    fontSize: 16,
  }
})