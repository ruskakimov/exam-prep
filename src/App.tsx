import { useState } from "react";
import "./App.css";
import mcq from "./mcq.json";

const topics = Object.keys(mcq);

function App() {
  const [topic, setTopic] = useState(topics[0]);
  const [qIdx, setQIdx] = useState(0);
  const [correct, setCorrect] = useState(0);

  const questions = (mcq as any)[topic];

  return (
    <div>
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <br />
      <br />

      <p>{questions.length} Questions</p>
      <p className="correct">{correct} Correct</p>
      <p className="wrong">{qIdx - correct} Wrong</p>

      <br />

      {qIdx < questions.length ? (
        <>
          <p>{questions[qIdx][0]}</p>
          <div className="op-container">
            {questions[qIdx][1].map((op: string) => (
              <button
                key={op}
                className="op-button"
                onClick={() => {
                  const answer = questions[qIdx][2];
                  if (answer.includes(op)) {
                    setCorrect((c) => c + 1);
                  }
                  setQIdx((i) => i + 1);
                }}
              >
                {op}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
