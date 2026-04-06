import { useState } from "react";

function FactorForm({ decision }) {

  const [factors, setFactors] = useState([
    { name: "", weight: 1, optionA: 1, optionB: 1 }
  ]);

  const [result, setResult] = useState(null);

  const addFactor = () => {
    setFactors([
      ...factors,
      { name: "", weight: 1, optionA: 1, optionB: 1 }
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...factors];
    updated[index][field] = value;
    setFactors(updated);
  };

  const calculate = () => {
    let scoreA = 0;
    let scoreB = 0;

    factors.forEach(f => {
      scoreA += f.weight * f.optionA;
      scoreB += f.weight * f.optionB;
    });

    // ✅ Confidence Calculation
    const total = scoreA + scoreB;
    const confidence = Math.abs(scoreA - scoreB) / total * 100;

    // ✅ Smart Explanation
    let reason = "";
    if (scoreA > scoreB) {
      reason = `${decision.a} performs better based on your higher weighted factors.`;
    } else {
      reason = `${decision.b} performs better based on your higher weighted factors.`;
    }

    setResult({
      scoreA,
      scoreB,
      winner: scoreA > scoreB ? decision.a : decision.b,
      confidence: confidence.toFixed(1),
      reason: reason
    });
  };

  return (
    <div>
      <h2>Compare: {decision.a} vs {decision.b}</h2>

      {factors.map((f, i) => (
        <div key={i}>
          <input
            placeholder="Factor (e.g. Salary)"
            value={f.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />

          <input
            type="number"
            placeholder="Weight"
            value={f.weight}
            onChange={(e) => handleChange(i, "weight", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder={decision.a}
            value={f.optionA}
            onChange={(e) => handleChange(i, "optionA", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder={decision.b}
            value={f.optionB}
            onChange={(e) => handleChange(i, "optionB", Number(e.target.value))}
          />

          <br /><br />
        </div>
      ))}

      <button onClick={addFactor}>+ Add Factor</button>

      <br /><br />

      <button onClick={calculate}>Calculate Decision</button>

      {/* ✅ RESULT DISPLAY */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results</h3>
          <p>{decision.a}: {result.scoreA}</p>
          <p>{decision.b}: {result.scoreB}</p>

          <h2>{result.winner} wins 🎉</h2>

          {/* ✅ Confidence */}
          <p>Confidence: {result.confidence}%</p>

          {/* ✅ Smart Explanation */}
          <p>{result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default FactorForm;