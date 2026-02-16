export function dayChecker(dateDue: string) {
    const currentDate = Date.now()
    const dateParts = dateDue.split('/')
    console.log("dateParts:", dateParts)
    const dateDueN = new Date(Number("0" + dateParts[2]), Number("0" + dateParts[1]), Number(dateParts[0]))
    const dateDueNo = new Date(Number("0" + dateParts[2]), Number("0" + dateParts[1]), Number(dateParts[0])).getTime()
    console.log("dueDateN", dateDueN)

    const difference = dateDueNo - currentDate
    const math = Math.floor(difference / 86400000)
    console.log(math)

    return (Math.floor(difference / 86400000))
}

