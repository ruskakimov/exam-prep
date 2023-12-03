import { useState } from "react";
import "./App.css";
import mcq from "./mcq.json";

const topics = Object.keys(mcq);

function App() {
  const [topic, setTopic] = useState(topics[0]);
  const [qIdx, setQIdx] = useState(0);
  const [correct, setCorrect] = useState(0);

  const [wrongQ, setWrongQ] = useState<number[]>([]);
  const [wrongOptions, setWrongOptions] = useState<string[]>([]);

  const questions = (mcq as any)[topic];

  const handleReset = (i: number) => {
    setQIdx(i);
    setCorrect(0);
    setWrongQ([]);
    setWrongOptions([]);
  };

  return (
    <div>
      <select
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value);
          handleReset(0);
        }}
      >
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <br />
      <br />

      <div className="restart-row">
        {Array(6)
          .fill(null)
          .map((_, i) => {
            const skip = i * 5;
            return (
              <button onClick={() => handleReset(skip)}>
                🔁 From {skip + 1}
              </button>
            );
          })}
      </div>

      <br />

      <p>{questions.length} Questions</p>
      <p className="correct">{correct} Correct</p>
      <p className="wrong">{wrongQ.length} Wrong</p>

      <br />

      {qIdx < questions.length ? (
        <>
          <p>{questions[qIdx][0]}</p>
          <div className="op-container">
            {(questions[qIdx][1] as string[]).map((op) => (
              <button
                key={op}
                className={`op-button ${
                  wrongOptions.includes(op) ? "op-wrong" : ""
                }`}
                onClick={() => {
                  if (wrongOptions.includes(op)) return;

                  const answer = questions[qIdx][2];

                  if (wrongOptions.length === 0) {
                    if (answer.includes(op)) {
                      setCorrect((c) => c + 1);
                      setQIdx((i) => i + 1);
                      setWrongOptions([]);
                    } else {
                      setWrongQ((a) => [...a, qIdx]);
                      setWrongOptions((ops) => [...ops, op]);
                    }
                  } else {
                    if (answer.includes(op)) {
                      setQIdx((i) => i + 1);
                      setWrongOptions([]);
                    } else {
                      setWrongOptions((ops) => [...ops, op]);
                    }
                  }
                }}
              >
                {op}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3>Revision:</h3>
          {wrongQ.map((i) => (
            <div style={{ marginBottom: "32px" }}>
              <p>{questions[i][0]}</p>
              <p>{questions[i][2]}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
