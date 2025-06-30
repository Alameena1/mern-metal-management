import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";

const METALS = ["Gold", "Silver", "Platinum"];

const MetalRateList = () => {
  const [purities, setPurities] = useState([]);
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchRates = async (selectedPage = 1) => {
    setLoading(true);
    try {
      const params = {
        page: selectedPage,
        limit: 5,
      };
      if (metal) params.metal = metal;
      if (purity) params.purity = purity;

      const res = await API.get("/rates", { params });

      setRates(res.data.rates);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFilter = () => {
    fetchRates(1);
  };

  const handlePageChange = (_, value) => {
    fetchRates(value);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Metal Rate History
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Metal"
          select
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
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
          onChange={(e) => setPurity(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {[...new Set(
            purities
              .filter((p) => p.metal.toLowerCase() === metal.toLowerCase())
              .map((p) => p.name)
          )].map((uniqueName) => (
            <MenuItem key={uniqueName} value={uniqueName}>
              {uniqueName}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleFilter}>
          Search
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : rates.length === 0 ? (
        <Typography>No rates found.</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metal</TableCell>
                <TableCell>Purity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.metal}</TableCell>
                  <TableCell>{r.purity}</TableCell>
                  <TableCell>{r.rate}</TableCell>
                  <TableCell>{r.rateDate.slice(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default MetalRateList;
