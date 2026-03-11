type toDoType = {
  id: number
  title: string
  time: string
  dateObject: Date
  isDone: boolean
}

export function dayChecker(todo: toDoType, isBar: boolean) {
    const currentDate = Math.floor(Date.now() / 8.64e+7) // translates the milliseconds into days
    let toDoDate = todo.dateObject

    //converting due to JSON serialisation for AsyncStorage, CHANGE IF DATE OBJECT IS USED FOR
    //OTHER STUFF PAST THIS
    if (typeof toDoDate === "string") {
        toDoDate = new Date(toDoDate)
    }

    const toDoDateNo = Math.floor(toDoDate.getTime() / 8.64e+7)
    
    const difference = toDoDateNo - currentDate

    if (difference <= 3 && !todo.isDone) {
        if (difference <= 1) {
            return isBar ? '#ff0000' : '#ffff'
        }
        return isBar ? '#f6ff00' : '#000000'
    }
    return isBar ? '#ffff' : '#000000'
}

