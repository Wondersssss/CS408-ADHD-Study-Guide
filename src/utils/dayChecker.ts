export function dayChecker(date: Date, isBar: boolean) {
    const currentDate = Math.floor(Date.now() / 8.64e+7) // translates the milliseconds into days
    const toDoDate = Math.floor(date.getTime() / 8.64e+7)
    const difference = toDoDate - currentDate

    // console.log("currentDate: ", currentDate, "\n",
    //             "toDoDate: ", toDoDate, "\n",
    //             "difference: ", difference
    // )



    if (difference < 3) {
        if (difference < 1) {
            return isBar ? '#ff0000' : '#ffff'
        }
        return isBar ? '#f6ff00' : '#000000'
    }
    return isBar ? '#ffff' : '#000000'
}

