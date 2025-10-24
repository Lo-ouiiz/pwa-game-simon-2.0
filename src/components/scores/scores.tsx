import { useCallback, useEffect, useState } from "react";
import "./scores.scss";

type ScoreEntry = {
  score: number;
  date?: string;
};

export default function Scores() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

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

      // trier par score décroissant, puis par date (plus récent en premier)
      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.date && b.date) return b.date < a.date ? 1 : -1;
        return 0;
      });

      setScores(list.slice(0, 10));
    } catch (e) {
      console.error("Impossible de lire les scores depuis localStorage", e);
      setScores([]);
    }
  }, []);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  // Reload scores when another component notifies that scores changed
  useEffect(() => {
    const onScoresUpdated = () => loadScores();
    globalThis.addEventListener("scoresUpdated", onScoresUpdated);
    return () =>
      globalThis.removeEventListener("scoresUpdated", onScoresUpdated);
  }, [loadScores]);

  const formatDate = (d?: string) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleString();
  };

  return (
    <div className="scoresContainer">
      <h2>Top 10 — tes meilleurs scores</h2>
      {scores.length === 0 ? (
        <p>Aucun score enregistré pour le moment.</p>
      ) : (
        <ol>
          {scores.map((s, idx) => (
            <li key={s.date ? `${s.score}-${s.date}` : `${s.score}-${idx}`}>
              <strong>{s.score}</strong>
              <span> — {formatDate(s.date)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
