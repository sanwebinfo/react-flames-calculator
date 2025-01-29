import confetti from 'canvas-confetti';
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import "./App.css";

const FLAMESCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const flamesEmojis = {
    Friends: "👫",
    Lovers: "💑",
    Affectionate: "💕",
    Marriage: "💍",
    Enemies: "⚔️",
    Siblings: "👨‍👩‍👧‍👦",
  };

  const calculateFLAMES = () => {
    setError("");
    setResult("");

    const sanitizedName1 = sanitizeHtml(name1.trim());
    const sanitizedName2 = sanitizeHtml(name2.trim());

    if (!sanitizedName1 || !sanitizedName2) {
      setError("Both names are required.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const name1Letters = sanitizedName1.toLowerCase().replace(/\s/g, "").split("");
      const name2Letters = sanitizedName2.toLowerCase().replace(/\s/g, "").split("");

      const frequencyMap1 = {};
      name1Letters.forEach((letter) => {
        frequencyMap1[letter] = (frequencyMap1[letter] || 0) + 1;
      });

      const frequencyMap2 = {};
      name2Letters.forEach((letter) => {
        frequencyMap2[letter] = (frequencyMap2[letter] || 0) + 1;
      });

      const allLetters = new Set([...name1Letters, ...name2Letters]);
      let totalCount = 0;
      allLetters.forEach((letter) => {
        const count1 = frequencyMap1[letter] || 0;
        const count2 = frequencyMap2[letter] || 0;
        totalCount += Math.abs(count1 - count2);
      });

      const flamesOrder = ["Friends", "Lovers", "Affectionate", "Marriage", "Enemies", "Siblings"];
      let currentFlames = [...flamesOrder];
      let currentIndex = 0;

      while (currentFlames.length > 1) {
        currentIndex = (currentIndex + totalCount - 1) % currentFlames.length;
        currentFlames.splice(currentIndex, 1);
      }

      setResult(`${currentFlames[0]} ${flamesEmojis[currentFlames[0]]}`);
      setIsLoading(false);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <h1 className="title has-text-centered valentine-title">💖 FLAMES Calculator</h1>
            <div className="field">
              <label className="label valentine-label">Your Name</label>
              <div className="control">
                <input
                  className="input valentine-input"
                  type="text"
                  placeholder="Enter Name 1"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="field">
              <label className="label valentine-label">Your Partner&apos;s Name</label>
              <div className="control">
                <input
                  className="input valentine-input"
                  type="text"
                  placeholder="Enter Name 2"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            {error && (
              <div className="notification is-danger valentine-error">
                <button className="delete" onClick={() => setError("")}></button>
                {error}
              </div>
            )}
            <div className="field">
              <div className="control has-text-centered">
                <button
                  className={`button is-primary valentine-button ${isLoading ? "is-loading" : ""}`}
                  onClick={calculateFLAMES}
                  disabled={isLoading}
                >
                  {isLoading ? "Calculating..." : "Calculate Love 💘"}
                </button>
              </div>
            </div>
            {result && (
              <div className="has-text-centered valentine-result">
                <h2 className="subtitle valentine-subtitle">
                  Result: <span className="has-text-weight-bold">{result}</span>
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FLAMESCalculator;