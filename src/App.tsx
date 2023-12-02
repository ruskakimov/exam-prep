import { useState } from "react";
import "./App.css";
import mcq from "./mcq.json";

const topics = Object.keys(mcq);

function App() {
  const [topic, setTopic] = useState(topics[0]);

  return (
    <div>
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
