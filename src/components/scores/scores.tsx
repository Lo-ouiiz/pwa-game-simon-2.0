import { useCallback, useEffect, useRef, useState } from "react";
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

  return (
    <dialog open className="scoresContainer" aria-modal="true" ref={dialogRef}>
      <div
        className="modalContent"
        style={{
          backgroundColor: themeColors?.background,
          color: themeColors?.text,
          borderColor: themeColors?.text,
        }}
      >
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
                    <strong>
                      <span className={`medal medal-${idx + 1}`}>{medal}</span>
                    </strong>
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
