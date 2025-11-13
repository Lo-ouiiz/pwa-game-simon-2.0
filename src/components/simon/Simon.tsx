import { useCallback, useEffect, useState } from "react";
import Tile from "./tile/Tile";
import "./Simon.scss";
import { Color, Theme, themes, ThemeColors } from "../../variables/themes";

interface SimonProps {
  theme: Theme;
}

const colors: Color[] = ["red", "blue", "green", "yellow"];

function Simon({ theme }: SimonProps) {
  const themeColors: ThemeColors = themes[theme];

  const [notificationGranted, setNotificationGranted] = useState(false);

  const [colorsSequence, setColorsSequence] = useState<Color[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameTurnWon, setGameTurnWon] = useState(0);

  const [sequenceSpeed, setSequenceSpeed] = useState(1000);

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

          setTimeout(() => {
            showColor();
          }, sequenceSpeed);
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
      navigator.vibrate(500);

      if (colorsSequence[colorIndex] === color) {
        setColorIndex((prev) => prev + 1);
      } else {
        setIsGameRunning(false);
        const text = `Ton score est de : ${gameTurnWon}. Pour rejouer, clique sur "Démarrer une partie"`;
        if (notificationGranted) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Perdu !", { body: text });
          });
        } else {
          alert("Perdu ! " + text);
        }
      }
    },
    [colorIndex, colorsSequence, notificationGranted, gameTurnWon]
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
