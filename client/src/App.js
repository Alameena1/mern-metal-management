import React from "react";
import PurityList from "./components/PurityList";
import MetalRateManager from "./components/MetalRateManager";
import MetalRateList from "./components/MetalRateList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Purity Management</h2>
      <PurityList />
      <MetalRateManager />
      <MetalRateList />
    </div>
  );
}

export default App;
