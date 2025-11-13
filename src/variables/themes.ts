export type Color = "red" | "blue" | "green" | "yellow";
export type Theme = "classic" | "neon" | "pastel";
export type Mode = "light" | "dark";

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

export const themes: Record<Theme, Record<Mode, ThemeColors>> = {
  classic: {
    light: {
      red: "#941414",
      redActive: "#e22a2a",
      blue: "#105348",
      blueActive: "#21a892",
      green: "#21540d",
      greenActive: "#44ac1b",
      yellow: "#b9a700",
      yellowActive: "#ffe920",
      background: "#ffeeeeff",
      text: "#111111ff",
    },
    dark: {
      red: "#941414",
      redActive: "#e22a2a",
      blue: "#105348",
      blueActive: "#21a892",
      green: "#21540d",
      greenActive: "#44ac1b",
      yellow: "#b9a700",
      yellowActive: "#ffe920",
      background: "#292931ff",
      text: "#f1f1f1",
    },
  },
  neon: {
    light: {
      red: "#f52789",
      redActive: "#ff87c1ff",
      blue: "#1685f8",
      blueActive: "#81beffff",
      green: "#e900ff",
      greenActive: "#f481ffff",
      yellow: "#faeb2c",
      yellowActive: "#fff678ff",
      background: "#d192e7ff",
      text: "#3a0066",
    },
    dark: {
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
  },
  pastel: {
    light: {
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
    dark: {
      red: "#ffafd1ff",
      redActive: "#ff8fbeff",
      blue: "#a2cdecff",
      blueActive: "#81bee9ff",
      green: "#c8e49dff",
      greenActive: "#b9e677ff",
      yellow: "#f8d687ff",
      yellowActive: "#f3c762ff",
      background: "#6d4b8fff",
      text: "#f8f2ef",
    },
  },
};
