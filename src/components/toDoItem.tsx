import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type toDoType = {
  id: number
  title: string
  isDone: boolean
}

const ToDoItem = ({todo} : {todo: toDoType}) => (
    <View style={styles.toDoContainer}>
        <View style={styles.toDoInfoContainer}>
        <Checkbox value={todo.isDone} color={todo.isDone ? '#4630EB' : undefined}/>
        <Text style={styles.toDoText}>{todo.title}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
        <Ionicons name='trash' size={24} color={'red'}/>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
  // TODO: CHANGE COLOURS TO THEMES
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
  newToDoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333'
  }
})

export default ToDoItem