export type Color = "red" | "blue" | "green" | "yellow";
export type Theme = "classic" | "neon" | "pastel";

export interface ThemeColors {
  red: string;
  redActive: string;
  blue: string;
  blueActive: string;
  green: string;
  greenActive: string;
  yellow: string;
  yellowActive: string;
  background: string; // couleur de fond
  text: string; // couleur du texte
}

export const themes: Record<Theme, ThemeColors> = {
  classic: {
    red: "#941414",
    redActive: "#e22a2a",
    blue: "#105348",
    blueActive: "#21a892",
    green: "#21540d",
    greenActive: "#44ac1b",
    yellow: "#b9a700",
    yellowActive: "#ffe920",
    background: "#f0f0f0",
    text: "#000000",
  },
  neon: {
    red: "#ff073a",
    redActive: "#ff4c6d",
    blue: "#00ffff",
    blueActive: "#66ffff",
    green: "#00ff00",
    greenActive: "#66ff66",
    yellow: "#ffff00",
    yellowActive: "#ffff66",
    background: "#0a0a0a",
    text: "#ffffff",
  },
  pastel: {
    red: "#f5a1a1",
    redActive: "#f7c1c1",
    blue: "#a1d4f5",
    blueActive: "#c1e4f7",
    green: "#a1f5a9",
    greenActive: "#c1f7c1",
    yellow: "#f5f3a1",
    yellowActive: "#f7f6c1",
    background: "#fff5f0",
    text: "#333333",
  },
};
