import { useCallback, useEffect } from "react";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";

type SoundKey = "workWin" | "timerWin" | "soundFail";

useEffect(() => {
  (async () => {
    await setAudioModeAsync({
      playsInSilentMode: true,
    });
  })();
}, []);

export function useSoundEffects(defaultVolume = 1) {
  const workWin = useAudioPlayer(require("../../sounds/workWin.mp3"));
  const timerWin = useAudioPlayer(require("../../sounds/timerWin.mp3"));
  const soundFail = useAudioPlayer(require("../../sounds/soundFail.mp3"));

  const playSound = useCallback(
    (sound: SoundKey, volume = defaultVolume) => {
      const v = volume >= 0 && volume <= 1 ? volume : 1;

      const player =
        sound === "workWin" ? workWin :
        sound === "timerWin" ? timerWin :
        soundFail

      player.volume = v;
      player.seekTo(0)
      player.play()
    },
    [workWin, timerWin, soundFail, defaultVolume]
  );

  return { playSound };
}