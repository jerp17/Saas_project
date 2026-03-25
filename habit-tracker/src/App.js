import { useState, useEffect } from "react";
import "./App.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("habits"));
    if (stored) setHabits(stored);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Reset daily
  useEffect(() => {
    const today = new Date().toDateString();

    const updated = habits.map((h) => {
      if (h.lastCompleted !== today) {
        return { ...h, done: false };
      }
      return h;
    });

    setHabits(updated);
  }, []);

  const addHabit = () => {
    if (habit.trim() === "") return;

    const newHabit = {
      text: habit,
      done: false,
      streak: 0,
      lastCompleted: null,
    };

    setHabits([...habits, newHabit]);
    setHabit("");
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const h = updated[index];

    if (h.lastCompleted === today) return;

    if (h.lastCompleted === yesterday.toDateString()) {
      h.streak += 1;
    } else {
      h.streak = 1;
    }

    h.done = true;
    h.lastCompleted = today;

    setHabits(updated);
  };

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  // 📊 Chart Data
  const chartData = habits.map((h) => ({
    name: h.text,
    streak: h.streak,
  }));

  return (
    <div className="container">
      <div className="card">
        <h1>🔥 Habit Tracker</h1>

        <div className="inputBox">
          <input
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Enter habit..."
          />
          <button onClick={addHabit}>Add</button>
        </div>

        <ul>
          {habits.map((h, index) => (
            <li key={index}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={h.done}
                  onChange={() => toggleHabit(index)}
                />
                <span className={h.done ? "done" : ""}>{h.text}</span>
              </div>

              <div className="right">
                <span className="streak">🔥 {h.streak}</span>
                <button onClick={() => deleteHabit(index)}>❌</button>
              </div>
            </li>
          ))}
        </ul>

        {/* 📊 CHART */}
        {habits.length > 0 && (
          <>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              📊 Progress
            </h2>

            <BarChart width={300} height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="streak" />
            </BarChart>
          </>
        )}
      </div>
    </div>
  );
}

export default App;