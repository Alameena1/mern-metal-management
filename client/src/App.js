import React from "react";
import PurityList from "./components/PurityList";
import MetalRateManager from "./components/MetalRateManager";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Purity Management</h2>
      <PurityList />
      <MetalRateManager />
    </div>
  );
}

export default App;
