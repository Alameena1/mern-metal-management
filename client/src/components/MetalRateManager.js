import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import Notification from "./Notification";

const METALS = ["Gold", "Silver", "Platinum"];

const MetalRateManager = () => {
  const [purities, setPurities] = useState([]);
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState("");
  const [latestRate, setLatestRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchPurities = async () => {
      try {
        const res = await API.get("/purities");
        setPurities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPurities();
  }, []);

  const handleMetalPurityChange = async (selectedMetal, selectedPurity) => {
    if (!selectedMetal || !selectedPurity) {
      setLatestRate(null);
      return;
    }
    setLoading(true);
    try {
      const res = await API.get(`/rates/latest`, {
        params: { metal: selectedMetal, purity: selectedPurity },
      });
      setLatestRate(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!metal) newErrors.metal = "Please select a metal.";
    if (!purity) newErrors.purity = "Please select a purity.";
    if (!rate) newErrors.rate = "Rate is required.";
    if (!rateDate) newErrors.rateDate = "Date is required.";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await API.post("/rates", { metal, purity, rate, rateDate });
      setNotifMessage("New rate added!");
      setNotifSeverity("success");
      setNotifOpen(true);
      setRate("");
      setRateDate("");
      setFormErrors({});
      await handleMetalPurityChange(metal, purity);
    } catch (err) {
      console.error(err);
      setNotifMessage("Error adding rate");
      setNotifSeverity("error");
      setNotifOpen(true);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Metal Rate Management
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}
      >
        <TextField
          label="Metal"
          select
          value={metal}
          onChange={(e) => {
            setMetal(e.target.value);
            handleMetalPurityChange(e.target.value, purity);
          }}
          error={!!formErrors.metal}
          helperText={formErrors.metal}
          sx={{ minWidth: 150 }}
        >
          {METALS.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Purity"
          select
          value={purity}
          onChange={(e) => {
            setPurity(e.target.value);
            handleMetalPurityChange(metal, e.target.value);
          }}
          error={!!formErrors.purity}
          helperText={formErrors.purity}
          sx={{ minWidth: 150 }}
        >
          {purities
            .filter((p) => p.metal.toLowerCase() === metal.toLowerCase())
            .map((p) => (
              <MenuItem key={p._id} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="New Rate"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          error={!!formErrors.rate}
          helperText={formErrors.rate}
        />
        <TextField
          label="Rate Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={rateDate}
          onChange={(e) => setRateDate(e.target.value)}
          error={!!formErrors.rateDate}
          helperText={formErrors.rateDate}
        />

        <Button variant="contained" type="submit">
          Save Rate
        </Button>
        <Notification
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          severity={notifSeverity}
          message={notifMessage}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : latestRate ? (
        <Typography variant="body1" color="textSecondary">
          Latest Rate: {latestRate.rate} (Date:{" "}
          {latestRate.rateDate.slice(0, 10)})
        </Typography>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No previous rate found.
        </Typography>
      )}
    </Box>
  );
};

export default MetalRateManager;
