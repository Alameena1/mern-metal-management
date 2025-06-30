import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import PurityPage from "./pages/PurityPage";
import MetalRateManagerPage from "./pages/MetalRateManagerPage";
import MetalRateHistoryPage from "./pages/MetalRateHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { useSnackbar } from "notistack";

function App() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    enqueueSnackbar("Logged out successfully.", { variant: "success" });
    navigate("/login");
  };

  return (
    <>
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
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<PurityPage />} />
          <Route path="/rate" element={<MetalRateManagerPage />} />
          <Route path="/history" element={<MetalRateHistoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
