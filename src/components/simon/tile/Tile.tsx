import { useCallback, useEffect, useState } from "react";
import { Color } from "../Simon";
import "../Simon.scss";

interface TileProps {
  color: Color;
  active: boolean;
  isGameRunning: boolean;
  isPlayerTurn: boolean;
  onClick: (color: Color) => void;
}

function Tile({
  color,
  active,
  isGameRunning,
  isPlayerTurn,
  onClick,
}: TileProps) {
  const [isTileClicked, setIsTileClicked] = useState(false);

  useEffect(() => {
    if (isTileClicked) {
      setTimeout(() => {
        setIsTileClicked(false);
      }, 500);
    }
  }, [isTileClicked]);

  const handleClick = useCallback(() => {
    if (!isPlayerTurn || !isGameRunning) return;

    setIsTileClicked(true);
    onClick(color);
  }, [color, onClick, isPlayerTurn, isGameRunning]);

  return (
    <div
      className={
        active || isTileClicked ? `button active ${color}` : `button ${color}`
      }
      onClick={handleClick}
    ></div>
  );
}

export default Tile;
