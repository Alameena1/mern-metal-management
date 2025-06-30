import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PurityPage from "./pages/PurityPage";
import MetalRateManagerPage from "./pages/MetalRateManagerPage";
import MetalRateHistoryPage from "./pages/MetalRateHistoryPage";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Purity
          </Button>
          <Button color="inherit" component={Link} to="/rate">
            Rate Management
          </Button>
          <Button color="inherit" component={Link} to="/history">
            Rate History
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<PurityPage />} />
          <Route path="/rate" element={<MetalRateManagerPage />} />
          <Route path="/history" element={<MetalRateHistoryPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
