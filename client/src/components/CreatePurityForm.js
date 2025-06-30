import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const METALS = ["Gold", "Silver", "Platinum"];

const CreatePurityForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [metal, setMetal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !metal) return;

    try {
      const res = await axios.post("http://localhost:5000/api/purities", {
        name,
        metal,
      });
      setName("");
      setMetal("");
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
        required
      />
      <TextField
        label="Metal"
        select
        value={metal}
        onChange={(e) => setMetal(e.target.value)}
        required
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
