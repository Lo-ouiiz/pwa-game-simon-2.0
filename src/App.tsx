import { useState } from "react";
import Simon from "./components/simon/Simon";
import InstallButton from "./components/install-button/InstallButton";
import { Theme, Mode, themes } from "./variables/themes";
import "./App.scss";
import { Gear } from "phosphor-react";
import SettingsModal from "./components/settings-modal/SettingsModal";

function App() {
  const [theme, setTheme] = useState<Theme>("classic");
  const [mode, setMode] = useState<Mode>("light");
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);

  const themeColors = themes[theme][mode];

  return (
    <div
      className="app"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
      }}
    >
      <InstallButton />

      <button
        className="settingsButton"
        onClick={() => setModalSettingsOpen(true)}
      >
        <Gear color={themeColors.text} />
      </button>

      <Simon theme={theme} mode={mode} />

      {modalSettingsOpen && (
        <SettingsModal
          theme={theme}
          mode={mode}
          setTheme={setTheme}
          setMode={setMode}
          setModalSettingsOpen={setModalSettingsOpen}
        />
      )}
    </div>
  );
}

export default App;
