import { useCallback, useEffect, useState } from "react";
import Tile from "./tile/Tile";
import "./Simon.scss";
import { Color, ThemeColors } from "../../variables/themes";
import victorySound from "../../assets/sounds/victory.mp3";
import gameOverSound from "../../assets/sounds/gameover.mp3";
import redSound from "../../assets/sounds/red.mp3";
import blueSound from "../../assets/sounds/blue.mp3";
import greenSound from "../../assets/sounds/green.mp3";
import yellowSound from "../../assets/sounds/yellow.mp3";

interface SimonProps {
  themeColors: ThemeColors;
  soundsEnabled: boolean;
}

const colors: Color[] = ["red", "blue", "green", "yellow"];

function Simon({ themeColors, soundsEnabled }: SimonProps) {
  const [notificationGranted, setNotificationGranted] = useState(false);
  const [colorsSequence, setColorsSequence] = useState<Color[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameTurnWon, setGameTurnWon] = useState(0);
  const [sequenceSpeed, setSequenceSpeed] = useState(1000);

  const colorSounds: Record<Color, string> = {
    red: redSound,
    blue: blueSound,
    green: greenSound,
    yellow: yellowSound,
  };

  const playSound = (soundPath: string) => {
    if (!soundsEnabled) return;
    const audio = new Audio(soundPath);
    audio.play();
  };

  const startSimon = useCallback(() => {
    setIsGameRunning(true);
    setGameTurnWon(0);
    setSequenceSpeed(1000);
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    setColorsSequence([firstColor]);
    setColorIndex(0);
    setIsPlayerTurn(false);
  }, []);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        setNotificationGranted(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && colorsSequence.length > 0) {
      let index = 0;

      const showColor = () => {
        if (index < colorsSequence.length) {
          setActiveColor(colorsSequence[index]);
          navigator.vibrate(200);

          setTimeout(() => {
            setActiveColor(null);
            index++;
          }, sequenceSpeed / 1.5);
          setTimeout(showColor, sequenceSpeed);
        } else {
          setIsPlayerTurn(true);
        }
      };
      showColor();
    }
  }, [colorsSequence, isPlayerTurn, sequenceSpeed]);

  useEffect(() => {
    if (colorsSequence.length > 0) {
      if (colorIndex === colorsSequence.length) {
        playSound(victorySound);
        setGameTurnWon(gameTurnWon + 1);
        setColorsSequence((prevSequence) => [
          ...prevSequence,
          colors[Math.floor(Math.random() * colors.length)],
        ]);

        setSequenceSpeed((prev) => Math.max(400, prev - 100));

        setTimeout(() => {
          setColorIndex(0);
          setIsPlayerTurn(false);
        }, 2000);
      }
    }
  }, [colorsSequence, colorIndex, gameTurnWon]);

  const handleClickButton = useCallback(
    (color: Color) => {
      playSound(colorSounds[color]);
      navigator.vibrate(500);

      if (colorsSequence[colorIndex] === color) {
        setColorIndex(colorIndex + 1);
      } else {
        playSound(gameOverSound);
        setIsGameRunning(false);
        const text = `Ton score est de : ${gameTurnWon} Pour rejouer, clique sur "Démarrer une partie"`;
        if (notificationGranted) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Perdu !", {
              body: text,
            });
          });
        } else {
          alert("Perdu ! " + text);
        }
      }
    },
    [
      colorIndex,
      colorsSequence,
      notificationGranted,
      gameTurnWon,
      soundsEnabled,
    ]
  );

  return (
    <div className="mainContainer">
      <h1>Jeu du Simon</h1>
      <div className="containerButtons">
        <Tile
          color="red"
          active={activeColor === "red"}
          isGameRunning={isGameRunning}
          isPlayerTurn={isPlayerTurn}
          onClick={handleClickButton}
          themeColors={themeColors}
        />
        <Tile
          color="blue"
          active={activeColor === "blue"}
          isGameRunning={isGameRunning}
          isPlayerTurn={isPlayerTurn}
          onClick={handleClickButton}
          themeColors={themeColors}
        />
      </div>
      <div className="containerButtons">
        <Tile
          color="green"
          active={activeColor === "green"}
          isGameRunning={isGameRunning}
          isPlayerTurn={isPlayerTurn}
          onClick={handleClickButton}
          themeColors={themeColors}
        />
        <Tile
          color="yellow"
          active={activeColor === "yellow"}
          isGameRunning={isGameRunning}
          isPlayerTurn={isPlayerTurn}
          onClick={handleClickButton}
          themeColors={themeColors}
        />
      </div>
      {isGameRunning ? (
        isPlayerTurn ? (
          <p className="textGame">A toi de jouer, reproduis la séquence</p>
        ) : (
          <p className="textGame">Observe bien la séquence</p>
        )
      ) : (
        <button
          className="startButton"
          onClick={startSimon}
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
            border: `2px solid ${themeColors.text}`,
          }}
        >
          Démarrer une partie
        </button>
      )}
    </div>
  );
}

export default Simon;
