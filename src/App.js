import { useState } from "react";
import DecisionForm from "./components/DecisionForm";
import FactorForm from "./components/FactorForm";

function App() {
  const [decision, setDecision] = useState(null);

  return (
    <div className="container">
      <h1>DecisionDeck</h1>

      <div className="card">
        {!decision ? (
          <DecisionForm onSubmit={setDecision} />
        ) : (
          <FactorForm decision={decision} />
        )}
      </div>
    </div>
  );
}

export default App;