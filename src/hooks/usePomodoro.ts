import {clamp} from '../utils/format'
import React, { useCallback, useEffect, useState } from 'react'

type Options = {
    durationSec: number
    changeSec: number
    onFinish?: () => void
    onBreak?: () => void
    onBreakEnd?: () => void
}
export default function usePomodoro({durationSec, changeSec, onFinish, onBreak, onBreakEnd}: Options) {
    const [secondsLeft, setSecondsLeft] = useState<number>(durationSec)
    const [running, setRunning] = useState<boolean>(false)
    
    const [secondsTillChange, setSecondsTillChangeLeft] = useState<number>(changeSec)
    const [breakTime, setBreakTime] = useState<boolean>(false)

    const progress = secondsLeft <= 0 ? 1 : 1 - secondsLeft / durationSec

    useEffect(() => {
        let id: ReturnType<typeof setInterval> | null = null

        if(running) {
            id = setInterval(() => {
                setSecondsLeft((s) => {
                    const nextChange = clamp(s - 1, 0, changeSec)
                    const next = clamp(s - 1, 0, durationSec)
                    if (nextChange === 0) {
                        if (!breakTime) {
                            setRunning(false)
                            setBreakTime(true)
                            onBreak?.()
                        }
                        else {
                            setRunning(true)
                            setBreakTime(false)
                            onBreakEnd?.()
                        }
                    }
                    if(next === 0) {
                        if (id) clearInterval(id)
                        setRunning(false)
                        onFinish?.()
                    }
                    return next
                })
            }, 1000)
        }
        return () => {
            if (id) clearInterval(id)
        }
    }, [running, durationSec, onFinish, onBreak, onBreakEnd])

    const start = useCallback(() => {
        if (secondsLeft === 0) setSecondsLeft(durationSec)
        setRunning(true)
    }, [durationSec, secondsLeft])

    const pause = useCallback(() => setRunning(false), [])

    const reset = useCallback(() => {
        setRunning(false)
        setSecondsLeft(durationSec)
    }, [durationSec])

    const endBreak = useCallback(() => {
        setRunning(true)
        setBreakTime(false)
    }, [setBreakTime, setRunning])

    useEffect(() => {
        setSecondsLeft(durationSec)
        setRunning(false)
    }, [durationSec])

    return {secondsLeft, running, progress, start, pause, reset}
}
