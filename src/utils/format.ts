export const formatMMSS = (seconds: number) => {
    const hr = Math.floor(seconds / 3600)
    const mm = Math.floor((seconds % 3600) / 60)
    const ss = seconds % 60
    return `${String(hr).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

export const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max)