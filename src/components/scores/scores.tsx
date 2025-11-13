import React, { useCallback, useEffect, useRef, useState } from "react";
import "./scores.scss";
import { XCircle } from "phosphor-react";

type ScoreEntry = {
  score: number;
  date?: string;
};

type ThemeColors = {
  background?: string;
  text?: string;
  border?: string;
};

type ScoresProps = {
  onClose?: () => void;
  themeColors?: ThemeColors;
};

export default function Scores({
  onClose,
  themeColors,
}: Readonly<ScoresProps>) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const loadScores = useCallback(() => {
    try {
      const raw = localStorage.getItem("scores");
      const parsed = raw ? JSON.parse(raw) : [];
      const list: ScoreEntry[] = Array.isArray(parsed)
        ? parsed.map((e: any) => ({
            score: Number(e?.score) || 0,
            date: e?.date,
          }))
        : [];

      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.date && b.date) return b.date < a.date ? 1 : -1;
        return 0;
      });

      const unique: ScoreEntry[] = [];
      const seen = new Set<number>();
      for (const item of list) {
        if (!seen.has(item.score)) {
          seen.add(item.score);
          unique.push(item);
        }
        if (unique.length >= 5) break;
      }

      setScores(unique);
    } catch (e) {
      console.error("Impossible de lire les scores depuis localStorage", e);
      setScores([]);
    }
  }, []);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  useEffect(() => {
    const onScoresUpdated = () => loadScores();
    globalThis.addEventListener("scoresUpdated", onScoresUpdated);
    return () =>
      globalThis.removeEventListener("scoresUpdated", onScoresUpdated);
  }, [loadScores]);

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
  // derive RGB components from theme text color (hex) so SCSS can use rgba(var(--text-r),...)
  const hexToRgb = (hex?: string) => {
    if (!hex) return null;
    // remove leading #
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
      className="scoresContainer"
      aria-modal="true"
      ref={dialogRef}
      style={cssVars as React.CSSProperties}
    >
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Top 5 - meilleurs scores</h2>
          {onClose && (
            <button className="closeButton" onClick={onClose}>
              <XCircle size={32} />
            </button>
          )}
        </div>

        <div className="modalBody">
          {scores.length === 0 ? (
            <p>Aucun score enregistré pour le moment.</p>
          ) : (
            <ol className="scoresList">
              {scores.map((s, idx) => {
                let medal: string | null = idx.toString();
                if (idx === 0) medal = "🥇";
                else if (idx === 1) medal = "🥈";
                else if (idx === 2) medal = "🥉";
                return (
                  <li key={`${s.score}`}>
                    <span className={`medal medal-${idx + 1}`}>{medal}</span>
                    <span className="scoreValue">{s.score}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </dialog>
  );
}
