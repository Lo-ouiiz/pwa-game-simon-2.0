import { Mode, Theme, themes } from "../../variables/themes";
import { X } from "phosphor-react";
import "./SettingsModal.scss";

interface SettingsModalProps {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  setModalSettingsOpen: (open: boolean) => void;
}

function SettingsModal({
  theme,
  mode,
  setTheme,
  setMode,
  setModalSettingsOpen,
}: SettingsModalProps) {
  const themeColors = themes[theme][mode];

  return (
    <div className="modalOverlay" onClick={() => setModalSettingsOpen(false)}>
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
            onClick={() => setModalSettingsOpen(false)}
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

        <div className="modalBody">
          <label>Mode d'affichage</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              className="switch"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              style={{
                backgroundColor:
                  mode === "dark" ? themeColors.text : themeColors.background,
                border: `2px solid ${themeColors.text}`,
              }}
            >
              <div
                className="switch-thumb"
                style={{
                  backgroundColor:
                    mode === "dark" ? themeColors.background : themeColors.text,
                  transform:
                    mode === "dark" ? "translateX(20px)" : "translateX(0)",
                }}
              />
            </div>
            <span>{mode === "dark" ? "Sombre" : "Clair"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
