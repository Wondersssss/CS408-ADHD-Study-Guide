import { clamp } from '../utils/format'
import { useCallback, useEffect, useState } from 'react'

type Options = {
    durationSec: number
    onFinish?: () => void
    workTime: number
    breakTime: number
    onStateChange?: () => void
}


export default function usePomodoro({ durationSec, onFinish, workTime, breakTime, onStateChange }: Options) {
    const [totalSecondsLeft, setTotalSecondsLeft] = useState<number>(durationSec)
    const [stateTimeLeft, setStateTimeLeft] = useState<number>(workTime)
    const [running, setRunning] = useState<boolean>(false)
    const [mode, setMode] = useState<string>('work')

    const progress = totalSecondsLeft <= 0 ? 1 : 1 - totalSecondsLeft / durationSec

    useEffect(() => {
        let idTotal: ReturnType<typeof setInterval> | null = null
        let idStates: ReturnType<typeof setInterval> | null = null

        if (running) {
            idTotal = setInterval(() => {
                setTotalSecondsLeft((s) => {
                    const totalNext = clamp(s - 1, 0, durationSec)
                    if (totalNext === 0) {
                        if (idTotal) clearInterval(idTotal)
                        setRunning(false)
                        onFinish?.()
                    }
                    return totalNext
                })
            }, 1000)

            idStates = setInterval(() => {
                setStateTimeLeft((ss) => {
                    const stateNext = clamp(ss - 1, 0, mode === "work" ? workTime : breakTime)
                    
                    if (stateNext === 0) {
                        const newMode = mode === "work" ? "break" : "work"
                        setMode(newMode)
                        onStateChange?.()
                        return newMode === "work" ? workTime : breakTime
                    }
                    
                    return stateNext
                })
            }, 1000)
        }
        
        return () => {
            if (idTotal) clearInterval(idTotal)
            if (idStates) clearInterval(idStates)
        }
    }, [running, durationSec, onFinish, workTime, breakTime, mode, onStateChange])

    const start = useCallback(() => {
        if (totalSecondsLeft === 0) {
            setTotalSecondsLeft(durationSec)
            setStateTimeLeft(mode === "work" ? workTime : breakTime)
        }
        setRunning(true)
    }, [durationSec, totalSecondsLeft, workTime, breakTime, mode])

    const pause = useCallback(() => setRunning(false), [])
    
    const reset = useCallback(() => {
        setRunning(false)
        setTotalSecondsLeft(durationSec)
        setStateTimeLeft(mode === "work" ? workTime : breakTime)
        setMode('work') 
    }, [durationSec, mode, workTime, breakTime])

    useEffect(() => {
        setTotalSecondsLeft(durationSec)
        setStateTimeLeft(mode === "work" ? workTime : breakTime)
        setRunning(false)
    }, [durationSec, workTime, breakTime, mode])

    return { totalSecondsLeft, stateTimeLeft, mode, running, progress, start, pause, reset }
}