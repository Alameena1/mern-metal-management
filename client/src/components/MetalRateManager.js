import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const METALS = ["Gold", "Silver", "Platinum"];

const MetalRateManager = () => {
  const [purities, setPurities] = useState([]);
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState("");
  const [latestRate, setLatestRate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPurities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/purities");
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
      const res = await axios.get(
        `http://localhost:5000/api/rates/latest?metal=${selectedMetal}&purity=${selectedPurity}`
      );
      setLatestRate(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!metal || !purity || !rate || !rateDate) return;

    try {
      await axios.post("http://localhost:5000/api/rates", {
        metal,
        purity,
        rate,
        rateDate,
      });
      alert("New rate added!");
      setRate("");
      setRateDate("");
      setLatestRate(null);
      await handleMetalPurityChange(metal, purity);
    } catch (err) {
      console.error(err);
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
          required
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
          required
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
          required
        />
        <TextField
          label="Rate Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={rateDate}
          onChange={(e) => setRateDate(e.target.value)}
          required
        />

        <Button variant="contained" type="submit">
          Save Rate
        </Button>
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
