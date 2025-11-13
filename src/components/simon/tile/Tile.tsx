import { useCallback, useEffect, useState } from "react";
import "../Simon.scss";
import { Color, ThemeColors } from "../../../variables/themes";

interface TileProps {
  color: Color;
  active: boolean;
  isGameRunning: boolean;
  isPlayerTurn: boolean;
  onClick: (color: Color) => void;
  themeColors: ThemeColors;
}

function Tile({
  color,
  active,
  isGameRunning,
  isPlayerTurn,
  onClick,
  themeColors,
}: TileProps) {
  const [isTileClicked, setIsTileClicked] = useState(false);

  useEffect(() => {
    if (isTileClicked) {
      const timeout = setTimeout(() => setIsTileClicked(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isTileClicked]);

  const handleClick = useCallback(() => {
    if (!isPlayerTurn || !isGameRunning) return;
    setIsTileClicked(true);
    onClick(color);
  }, [color, onClick, isPlayerTurn, isGameRunning]);

  const bgColor: string =
    active || isTileClicked
      ? themeColors[`${color}Active` as keyof ThemeColors]
      : themeColors[color];

  let tileBorderRadius: string;
  switch (color) {
    case "red":
      tileBorderRadius = "199px 10px 10px 10px";
      break;
    case "blue":
      tileBorderRadius = "10px 199px 10px 10px";
      break;
    case "green":
      tileBorderRadius = "10px 10px 10px 199px";
      break;
    case "yellow":
      tileBorderRadius = "10px 10px 199px 10px";
      break;
    default:
      tileBorderRadius = "10px";
  }

  return (
    <div
      className="button"
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        borderRadius: tileBorderRadius,
        boxShadow: active || isTileClicked ? `0 0 15px ${bgColor}` : undefined,
        cursor: isPlayerTurn && isGameRunning ? "pointer" : "default",
      }}
    ></div>
  );
}

export default Tile;
