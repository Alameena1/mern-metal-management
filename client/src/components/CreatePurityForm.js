import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import API from "../api";

const METALS = ["Gold", "Silver", "Platinum"];

const CreatePurityForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [metal, setMetal] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Purity name is required.";
    if (!metal) newErrors.metal = "Please select a metal.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.post("/purities", { name, metal });
      setName("");
      setMetal("");
      setErrors({});
      onCreate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Purity Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Metal"
        select
        value={metal}
        onChange={(e) => setMetal(e.target.value)}
        error={!!errors.metal}
        helperText={errors.metal}
        sx={{ minWidth: 120 }}
      >
        {METALS.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Box>
  );
};

export default CreatePurityForm;
