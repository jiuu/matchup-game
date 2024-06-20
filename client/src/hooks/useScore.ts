import { useEffect, useState } from "react";
//@ts-ignore TypeScript bug with use-sound
import useSound from "use-sound";

export const useScore = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mute, setMute] = useState(false)
  const [playSnap] = useSound("/audio/snap.mp3",{volume:0.1, soundEnabled:!mute});
  const [playFaker] = useSound("/audio/faker.mp3",{volume:0.2, soundEnabled:!mute});
  const [playPentakill] = useSound("/audio/pentakill.mp3",{volume:0.2, soundEnabled:!mute});
  useEffect (() => {
  if (localStorage) {
    const muteLocal = localStorage.getItem("mute");
    setMute(muteLocal === "true");
  }
}, []);

  const handleCorrectAnswer = () => {
    setScore((s) => s + 50 + streak * 10);
    setStreak((s) => s + 1);
    playSnap();
    if (streak == 4) {
      playPentakill();
    }
    if (streak == 9) {
      playFaker();
    }
  };

  const resetStreak = () => {
    setStreak(0);
  };
  const toggleMute = () => {
    setMute(s => !s)
    localStorage.setItem('mute', JSON.stringify(!mute))


  }

  return { score, streak, mute, handleCorrectAnswer, resetStreak, toggleMute };
};