import { useState } from "react";
import Simon from "./components/simon/Simon";
import InstallButton from "./components/install-button/InstallButton";
import { Theme, Mode, themes, ThemeColors } from "./variables/themes";
import "./App.scss";
import { Gear, Trophy } from "phosphor-react";
import Scores from "./components/scores/scores";
import SettingsModal from "./components/settings-modal/SettingsModal";
function App() {
  const [theme, setTheme] = useState<Theme>("classic");
  const [mode, setMode] = useState<Mode>("light");
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [rankingsModalOpen, setRankingsModalOpen] = useState(false);

  const [customThemeColors, setCustomThemeColors] = useState<ThemeColors>({
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
  });

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
