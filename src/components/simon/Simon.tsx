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

  const startSimon = useCallback(() => {
    setIsGameRunning(true);
    setGameTurnWon(0);
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    setColorsSequence([firstColor]);
    setColorIndex(0);
    setIsPlayerTurn(false);
  }, []);

  useEffect(() => {
    if (!("Notification" in window)) return;
    Notification.requestPermission().then((result) => {
      if (result === "granted") setNotificationGranted(true);
    });
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && colorsSequence.length > 0) {
      let index = 0;

      const showColor = () => {
        if (index < colorsSequence.length) {
          setActiveColor(colorsSequence[index]);
          navigator.vibrate?.(500);

          setTimeout(() => {
            setActiveColor(null);
            index++;
          }, 500);

          setTimeout(() => showColor(), 1000);
        } else {
          setIsPlayerTurn(true);
        }
      };

      showColor();
    }
  }, [colorsSequence, isPlayerTurn]);

  useEffect(() => {
    if (colorsSequence.length > 0 && colorIndex === colorsSequence.length) {
      setGameTurnWon((prev) => prev + 1);
      setColorsSequence((prev) => [
        ...prev,
        colors[Math.floor(Math.random() * colors.length)],
      ]);
      setTimeout(() => {
        setColorIndex(0);
        setIsPlayerTurn(false);
      }, 2000);
    }
  }, [colorsSequence, colorIndex]);

  const handleClickButton = useCallback(
    (color: Color) => {
      navigator.vibrate?.(500);

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

      {!isGameRunning && (
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
