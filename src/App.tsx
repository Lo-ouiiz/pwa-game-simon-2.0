import Simon from "./components/simon/Simon";
import "./App.scss";
import InstallButton from "./components/install-button/InstallButton";
import { useState } from "react";
import { Theme, themes } from "./variables/themes";

function App() {
  const [theme, setTheme] = useState<Theme>("classic");
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
      }}
    >
      <InstallButton />

      <div style={{ marginBottom: "10px" }}>
        <label>Choisir un thème : </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
        >
          {Object.keys(themes).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Simon theme={theme} />
    </div>
  );
}

export default App;
