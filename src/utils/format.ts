export const formatMMSS = (seconds: number) => {
    const mm = Math.floor(seconds / 60)
    const ss = seconds % 60
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

export const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max)