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
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <InstallButton />

      <button
        className="settingsButton"
        onClick={() => setModalOpen(true)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          color: themeColors.text,
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <Gear />
      </button>

      <Simon theme={theme} />

      {modalOpen && (
        <div className={"modalOverlay"} onClick={() => setModalOpen(false)}>
          <div
            className="modalContent"
            style={{
              backgroundColor: themeColors.background,
              color: themeColors.text,
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              minHeight: "100px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2>Paramètres</h2>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: themeColors.text,
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <X weight="bold" />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                }}
              >
                Thème du jeu
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                style={{
                  padding: "6px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: `2px solid ${themeColors.text}`,
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
