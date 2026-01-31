import Sound from "react-native-sound";

export function playSound(filename: string, error: any) {
    const sound = new Sound(filename, Sound.MAIN_BUNDLE, error)
    sound.play()
    sound.release()
}

export default playSound