const express = require("express");
const router = express.Router();
const MetalRate = require("../models/MetalRate");

// GET all rates (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { metal, purity } = req.query;
    const query = {};
    if (metal) query.metal = metal;
    if (purity) query.purity = purity;

    const rates = await MetalRate.find(query).sort({ rateDate: -1 });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET latest rate for a metal & purity
router.get("/latest", async (req, res) => {
  try {
    const { metal, purity } = req.query;
    if (!metal || !purity) {
      return res.status(400).json({ error: "Metal and purity are required." });
    }

    const latest = await MetalRate.findOne({ metal, purity }).sort({ rateDate: -1 });
    if (!latest) {
      return res.json(null);
    }
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new rate
router.post("/", async (req, res) => {
  try {
    const { metal, purity, rate, rateDate } = req.body;
    if (!metal || !purity || !rate || !rateDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newRate = new MetalRate({ metal, purity, rate, rateDate });
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
