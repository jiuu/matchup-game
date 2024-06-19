import { useState } from "react";
import useSound from "use-sound";

export const useScore = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [playSnap] = useSound("/audio/snap.mp3",{volume:0.2});
  const [playFaker] = useSound("/audio/faker.mp3",{volume:0.2});
  const [playPentakill] = useSound("/audio/pentakill.mp3",{volume:0.3});

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

  return { score, streak, handleCorrectAnswer, resetStreak };
};