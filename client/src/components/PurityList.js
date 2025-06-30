import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import CreatePurityForm from "./CreatePurityForm";

const PurityList = () => {
  const [purities, setPurities] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <CircularProgress />;

  return (
    <div>
      <CreatePurityForm onCreate={handleCreate} />
      <List>
        {purities.map((purity) => (
          <ListItem key={purity._id} divider>
            <ListItemText primary={`${purity.metal} - ${purity.name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PurityList;
