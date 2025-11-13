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

      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.date && b.date) return b.date < a.date ? 1 : -1;
        return 0;
      });

      // Garder uniquement les scores distincts (par valeur) et limiter à 5
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


  return (
    <div className="scoresContainer">
      <h2>Top 5 — tes meilleurs scores</h2>
      {scores.length === 0 ? (
        <p>Aucun score enregistré pour le moment.</p>
      ) : (
        <ol>
          {scores.map((s, idx) => {
            let medal: string | null = (idx + 1).toString();
            if (idx === 0) medal = "🥇";
            else if (idx === 1) medal = "🥈";
            else if (idx === 2) medal = "🥉";
            return (
              <li key={`${s.score}`}>
                <strong>
                  {medal ? (
                    <span className={`medal medal-${idx + 1}`}>{medal}</span>
                  ) : null}
                  <span className="scoreValue">{s.score}</span>
                </strong>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
