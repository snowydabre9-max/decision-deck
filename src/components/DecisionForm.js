import { useState } from "react";

function DecisionForm({ onSubmit }) {
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");

  const handleSubmit = () => {
    if (!optionA || !optionB) {
      alert("Please enter both options");
      return;
    }

    // ✅ FIXED LINE
    onSubmit({ a: optionA, b: optionB });
  };

  return (
    <div>
      <h2>Enter Your Decision</h2>

      <input
        type="text"
        placeholder="Option A"
        value={optionA}
        onChange={(e) => setOptionA(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Option B"
        value={optionB}
        onChange={(e) => setOptionB(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default DecisionForm;