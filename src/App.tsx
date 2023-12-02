import { useState } from "react";
import "./App.css";
import mcq from "./mcq.json";

const topics = Object.keys(mcq);

function App() {
  const [topic, setTopic] = useState(topics[0]);
  const [qIdx, setQIdx] = useState(0);
  const [correct, setCorrect] = useState(0);

  const [wrongQ, setWrongQ] = useState<number[]>([]);
  // const [wrongOptions, setWrongOptions] = useState<number[]>([]);

  const questions = (mcq as any)[topic];

  const handleReset = () => {
    setQIdx(0);
    setCorrect(0);
  };

  return (
    <div>
      <select
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value);
          handleReset();
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

      <button onClick={handleReset}>Reset</button>

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
                  } else {
                    setWrongQ((a) => [...a, qIdx]);
                  }
                  setQIdx((i) => i + 1);
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
