import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CreatePurityForm from "./CreatePurityForm";

const METALS = ["Gold", "Silver", "Platinum"];

const PurityList = () => {
  const [purities, setPurities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", metal: "" });

  const fetchPurities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/purities");
      setPurities(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPurities();
  }, []);

  const handleCreate = (newPurity) => {
    setPurities((prev) => [newPurity, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purity?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/purities/${id}`);
      setPurities((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (purity) => {
    setEditingId(purity._id);
    setEditData({ name: purity.name, metal: purity.metal });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ name: "", metal: "" });
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/purities/${id}`, editData);
      setPurities((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CreatePurityForm onCreate={handleCreate} />
      <List>
        {purities.map((purity) => (
          <ListItem key={purity._id} divider>
            {editingId === purity._id ? (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", width: "100%" }}>
                <TextField
                  label="Purity Name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  size="small"
                />
                <TextField
                  label="Metal"
                  select
                  value={editData.metal}
                  onChange={(e) => setEditData({ ...editData, metal: e.target.value })}
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  {METALS.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton onClick={() => handleSave(purity._id)} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="secondary">
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <ListItemText primary={`${purity.metal} - ${purity.name}`} />
                <IconButton onClick={() => handleEdit(purity)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(purity._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PurityList;
