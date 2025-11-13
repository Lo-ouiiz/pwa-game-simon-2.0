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
  background: string;
  text: string;
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
    background: "#ffeeeeff",
    text: "#141414ff",
  },
  neon: {
    red: "#f52789",
    redActive: "#ff87c1ff",
    blue: "#1685f8",
    blueActive: "#81beffff",
    green: "#e900ff",
    greenActive: "#f481ffff",
    yellow: "#faeb2c",
    yellowActive: "#fff678ff",
    background: "#3d144c",
    text: "#ffffff",
  },
  pastel: {
    red: "#ffcbe1",
    redActive: "#ffafd1ff",
    blue: "#bcd8ec",
    blueActive: "#a2cdecff",
    green: "#d6e5bd",
    greenActive: "#c8e49dff",
    yellow: "#f9e1a8",
    yellowActive: "#f8d687ff",
    background: "#f8f2ef",
    text: "#7f6896ff",
  },
};
