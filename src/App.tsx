import { useState } from "react";
import Simon from "./components/simon/Simon";
import InstallButton from "./components/install-button/InstallButton";
import { Theme, themes } from "./variables/themes";
import "./App.scss";
import { Gear, X } from "phosphor-react";

function App() {
  const [theme, setTheme] = useState<Theme>("classic");
  const [modalOpen, setModalOpen] = useState(false);
  const themeColors = themes[theme];

  return (
    <div
      className="app"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
      }}
    >
      <InstallButton />

      <button className="settingsButton" onClick={() => setModalOpen(true)}>
        <Gear color={themeColors.text} />
      </button>

      <Simon theme={theme} />

      {modalOpen && (
        <div className="modalOverlay" onClick={() => setModalOpen(false)}>
          <div
            className="modalContent"
            style={{
              backgroundColor: themeColors.background,
              color: themeColors.text,
              borderColor: themeColors.text,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Paramètres</h2>
              <button
                className="closeButton"
                onClick={() => setModalOpen(false)}
              >
                <X color={themeColors.text} weight="bold" />
              </button>
            </div>

            <div className="modalBody">
              <label>Thème du jeu</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                style={{
                  borderColor: themeColors.text,
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                }}
              >
                {Object.keys(themes).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
