import { useCallback, useEffect } from "react";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";

type SoundKey = "workWin" | "timerWin" | "toDoAdd" | "toDoTrash" | "soundFail";

useEffect(() => {
  (async () => {
    await setAudioModeAsync({
      playsInSilentMode: true,
    });
  })();
}, []);

export function useSoundEffects(defaultVolume = 1) {
  const workWin = useAudioPlayer(require("../../sounds/workWin.mp3"))
  const timerWin = useAudioPlayer(require("../../sounds/timerWin.mp3"))
  const toDoAdd = useAudioPlayer(require("../../sounds/toDoAdd.wav"))
  const toDoTrash = useAudioPlayer(require("../../sounds/toDoTrash.wav"))
  const soundFail = useAudioPlayer(require("../../sounds/soundFail.mp3"))

  const playSound = useCallback(
    (sound: SoundKey, volume = defaultVolume) => {
      const v = volume >= 0 && volume <= 1 ? volume : 1;

      const player =
        sound === "workWin" ? workWin :
        sound === "timerWin" ? timerWin :
        sound === "toDoAdd" ? toDoAdd :
        sound === "toDoTrash" ? toDoTrash :
        soundFail

      player.volume = v;
      player.seekTo(0)
      player.play()
    },
    [workWin, timerWin, toDoAdd, toDoTrash, soundFail, defaultVolume]
  )
  return { playSound }
}