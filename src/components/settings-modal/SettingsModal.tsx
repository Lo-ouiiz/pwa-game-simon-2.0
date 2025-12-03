import { Mode, Theme, themes, ThemeColors } from "../../variables/themes";
import { X } from "phosphor-react";
import "./SettingsModal.scss";
import { useState } from "react";

interface SettingsModalProps {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  customThemeColors: ThemeColors;
  setCustomThemeColors: (colors: ThemeColors) => void;
  setModalSettingsOpen: (open: boolean) => void;
  soundsEnabled: boolean;
  setSoundsEnabled: (enabled: boolean) => void;
}

function SettingsModal({
  theme,
  mode,
  setTheme,
  setMode,
  customThemeColors,
  setCustomThemeColors,
  setModalSettingsOpen,
  soundsEnabled,
  setSoundsEnabled,
}: Readonly<SettingsModalProps>) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const themeColors =
    theme === "custom" ? customThemeColors : themes[theme][mode];

  const handleCustomColorChange = (key: keyof ThemeColors, value: string) => {
    const lightenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace("#", ""), 16);
      let r = (num >> 16) + percent;
      let g = ((num >> 8) & 0x00ff) + percent;
      let b = (num & 0x0000ff) + percent;
      r = r > 255 ? 255 : r < 0 ? 0 : r;
      g = g > 255 ? 255 : g < 0 ? 0 : g;
      b = b > 255 ? 255 : b < 0 ? 0 : b;
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    };

    const newColors = { ...customThemeColors, [key]: value };

    if (["red", "blue", "green", "yellow"].includes(key)) {
      const activeKey = (key + "Active") as keyof ThemeColors;
      newColors[activeKey] = lightenColor(value, 50);
    }

    setCustomThemeColors(newColors);
  };

  const deleteCache = async () => {
    localStorage.removeItem("scores");
    localStorage.removeItem("completedObjectives");
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const colorLabels: Record<keyof ThemeColors, string> = {
    red: "Haut gauche",
    blue: "Haut droite",
    green: "Bas gauche",
    yellow: "Bas droite",
    background: "Fond",
    text: "Texte",
    redActive: "",
    blueActive: "",
    greenActive: "",
    yellowActive: "",
  };

  const colorKeys: (keyof ThemeColors)[] = [
    "red",
    "blue",
    "green",
    "yellow",
    "background",
    "text",
  ];

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
            {["classic", "neon", "pastel", "custom"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {theme !== "custom" && (
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
                      mode === "dark"
                        ? themeColors.background
                        : themeColors.text,
                    transform:
                      mode === "dark" ? "translateX(20px)" : "translateX(0)",
                  }}
                />
              </div>
              <span>{mode === "dark" ? "Sombre" : "Clair"}</span>
            </div>
          </div>
        )}

        {theme === "custom" && (
          <div className="modalBody">
            <label>Thème personnalisé</label>
            <div className="colorGrid">
              {colorKeys.map((key) => (
                <div key={key} className="colorInput">
                  <label>{colorLabels[key]}</label>
                  <input
                    type="color"
                    value={customThemeColors[key]}
                    onChange={(e) =>
                      handleCustomColorChange(key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modalBody">
          <label>Effets sonores</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              className="switch"
              onClick={() => setSoundsEnabled(!soundsEnabled)}
              style={{
                backgroundColor: soundsEnabled
                  ? themeColors.text
                  : themeColors.background,
                border: `2px solid ${themeColors.text}`,
              }}
            >
              <div
                className="switch-thumb"
                style={{
                  backgroundColor: soundsEnabled
                    ? themeColors.background
                    : themeColors.text,
                  transform: soundsEnabled
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />
            </div>
            <span>{soundsEnabled ? "Activés" : "Désactivés"}</span>
          </div>
        </div>

        <div className="modalBody">
          <button
            onClick={deleteCache}
            style={{
              backgroundColor: themeColors.background,
              color: themeColors.text,
              border: `2px solid ${themeColors.text}`,
            }}
          >
            Supprimer mes données
          </button>
        </div>
      </div>

      {showSuccessPopup && (
        <div
          className="successPopup"
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
            borderColor: themeColors.text,
          }}
        >
          Données supprimées avec succès !
        </div>
      )}
    </div>
  );
}

export default SettingsModal;
