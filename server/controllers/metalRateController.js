const MetalRate = require("../models/MetalRate");

// GET all rates with optional filters and pagination
exports.getRates = async (req, res) => {
  try {
    const { metal, purity, page = 1, limit = 10 } = req.query;
    const query = {};
    if (metal) query.metal = metal;
    if (purity) query.purity = new RegExp(`^${purity}$`, "i");

    const rates = await MetalRate.find(query)
      .sort({ rateDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await MetalRate.countDocuments(query);

    res.json({
      rates,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET latest rate
exports.getLatestRate = async (req, res) => {
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
};

// CREATE new rate
exports.createRate = async (req, res) => {
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
};
