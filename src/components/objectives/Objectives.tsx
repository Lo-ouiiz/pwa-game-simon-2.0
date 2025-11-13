import React, { useEffect, useRef, useState } from "react";
import "./Objectives.scss";
import { XCircle } from "phosphor-react";

type ThemeColors = {
  background?: string;
  text?: string;
  border?: string;
};

type ObjectivesProps = {
  onClose?: () => void;
  themeColors?: ThemeColors;
};

type Objective = {
  id: number;
  title: string;
  target: number;
  completed: boolean;
};

export default function Objectives({
  onClose,
  themeColors,
}: Readonly<ObjectivesProps>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: 1, title: "5 coups réussis à la suite", target: 5, completed: false },
    { id: 2, title: "10 coups réussis à la suite", target: 10, completed: false },
    { id: 3, title: "20 coups réussis à la suite", target: 20, completed: false },
  ]);

  useEffect(() => {
    const checkObjectives = () => {
      try {
        const raw = localStorage.getItem("scores");
        const parsed = raw ? JSON.parse(raw) : [];
        const scores: number[] = Array.isArray(parsed)
          ? parsed.map((e: any) => Number(e?.score) || 0)
          : [];
        
        const maxScore = scores.length > 0 ? Math.max(...scores) : 0;

        setObjectives((prev) =>
          prev.map((obj) => ({
            ...obj,
            completed: maxScore >= obj.target,
          }))
        );
      } catch (e) {
        console.error("Impossible de lire les scores", e);
      }
    };

    checkObjectives();

    const onScoresUpdated = () => checkObjectives();
    globalThis.addEventListener("scoresUpdated", onScoresUpdated);
    return () =>
      globalThis.removeEventListener("scoresUpdated", onScoresUpdated);
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    const onClick = (e: MouseEvent) => {
      if (e.target === dlg && onClose) onClose();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };

    dlg.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      dlg.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const cssVars: Record<string, string | undefined> = {
    ["--bg"]: themeColors?.background,
    ["--text"]: themeColors?.text,
    ["--border"]: themeColors?.border ?? themeColors?.text,
  };

  const hexToRgb = (hex?: string) => {
    if (!hex) return null;
    const h = hex.replace(/^#/, "");
    if (h.length === 3) {
      const r = Number.parseInt(h[0] + h[0], 16);
      const g = Number.parseInt(h[1] + h[1], 16);
      const b = Number.parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    if (h.length === 6 || h.length === 8) {
      const r = Number.parseInt(h.slice(0, 2), 16);
      const g = Number.parseInt(h.slice(2, 4), 16);
      const b = Number.parseInt(h.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  };

  const rgb = hexToRgb(themeColors?.text);
  cssVars["--text-r"] = String(rgb?.r ?? 17);
  cssVars["--text-g"] = String(rgb?.g ?? 17);
  cssVars["--text-b"] = String(rgb?.b ?? 17);

  return (
    <dialog
      open
      className="objectivesContainer"
      aria-modal="true"
      ref={dialogRef}
      style={cssVars as React.CSSProperties}
    >
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Objectifs</h2>
          {onClose && (
            <button className="closeButton" onClick={onClose}>
              <XCircle size={32} />
            </button>
          )}
        </div>

        <div className="modalBody">
          <ul className="objectivesList">
            {objectives.map((obj) => (
              <li key={obj.id} className={obj.completed ? "completed" : ""}>
                <span className="objectiveIcon">
                  {obj.completed ? "✅" : "⬜"}
                </span>
                <span className="objectiveTitle">{obj.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
