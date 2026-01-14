import {clamp} from '../utils/format'
import React, { useCallback, useEffect, useState } from 'react'

type Options = {
    durationSec: number
    onFinish?: () => void

}
export default function usePomodoro({durationSec, onFinish}: Options) {
    const [secondsLeft, setSecondsLeft] = useState<number>(durationSec)
    const [running, setRunning] = useState<boolean>(false)

    const progress = secondsLeft <= 0 ? 1 : 1 - secondsLeft / durationSec

    useEffect(() => {
        let id: ReturnType<typeof setInterval> | null = null

        if(running) {
            id = setInterval(() => {
                setSecondsLeft((s) => {
                    const next = clamp(s - 1, 0, durationSec)
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
    }, [running, durationSec, onFinish])

    const start = useCallback(() => {
        if (secondsLeft === 0) setSecondsLeft(durationSec)
        setRunning(true)
    }, [durationSec, secondsLeft])

    const pause = useCallback(() => setRunning(false), [])
    const reset = useCallback(() => {
        setRunning(false)
        setSecondsLeft(durationSec)
    }, [durationSec])

    useEffect(() => {
        setSecondsLeft(durationSec)
        setRunning(false)
    }, [durationSec])

    return {secondsLeft, running, progress, start, pause, reset}
}
