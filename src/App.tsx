import { useState, useEffect } from "react";
import Simon from "./components/simon/Simon";
import InstallButton from "./components/install-button/InstallButton";
import { Theme, Mode, themes, ThemeColors } from "./variables/themes";
import "./App.scss";
import { Gear, Trophy } from "phosphor-react";
import Scores from "./components/scores/scores";
import SettingsModal from "./components/settings-modal/SettingsModal";
function App() {
  const getInitialTheme = (): Theme => {
    return (localStorage.getItem("theme") as Theme) || "classic";
  };

  const getInitialMode = (): Mode => {
    return (localStorage.getItem("mode") as Mode) || "light";
  };

  const getInitialSoundsEnabled = (): boolean => {
    return localStorage.getItem("soundsEnabled") === "false" ? false : true;
  };

  const getInitialCustomColors = (): ThemeColors => {
    const stored = localStorage.getItem("customThemeColors");
    if (stored) return JSON.parse(stored);
    return {
      red: "#941414",
      redActive: "#e22a2a",
      blue: "#105348",
      blueActive: "#21a892",
      green: "#21540d",
      greenActive: "#44ac1b",
      yellow: "#b9a700",
      yellowActive: "#ffe920",
      background: "#ffeeee",
      text: "#111111",
    };
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mode, setMode] = useState<Mode>(getInitialMode);
  const [soundsEnabled, setSoundsEnabled] = useState(getInitialSoundsEnabled);
  const [customThemeColors, setCustomThemeColors] = useState<ThemeColors>(
    getInitialCustomColors
  );
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);
  const [rankingsModalOpen, setRankingsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("soundsEnabled", soundsEnabled.toString());
  }, [soundsEnabled]);

  useEffect(() => {
    if (theme === "custom") {
      localStorage.setItem(
        "customThemeColors",
        JSON.stringify(customThemeColors)
      );
    }
  }, [customThemeColors, theme]);

  const themeColors =
    theme === "custom" ? customThemeColors : themes[theme][mode];

  return (
    <div
      className="app"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
      }}
    >
      <InstallButton />

      <div className="menu">
        <button
          className="settingsButton"
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
          }}
          onClick={() => setRankingsModalOpen(!rankingsModalOpen)}
        >
          <Trophy color={themeColors.text} />
        </button>

        <button
          className="rankingsButton"
          onClick={() => setModalSettingsOpen(true)}
        >
          <Gear color={themeColors.text} />
        </button>
      </div>

      <Simon themeColors={themeColors} soundsEnabled={soundsEnabled} />

      {rankingsModalOpen && (
        <Scores
          onClose={() => setRankingsModalOpen(false)}
          themeColors={themeColors}
        />
      )}

      {modalSettingsOpen && (
        <SettingsModal
          theme={theme}
          mode={mode}
          setTheme={setTheme}
          setMode={setMode}
          customThemeColors={customThemeColors}
          setCustomThemeColors={setCustomThemeColors}
          setModalSettingsOpen={setModalSettingsOpen}
          soundsEnabled={soundsEnabled}
          setSoundsEnabled={setSoundsEnabled}
        />
      )}
    </div>
  );
}

export default App;
