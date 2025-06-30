const Purity = require("../models/Purity");

// GET all purities
exports.getPurities = async (req, res) => {
  try {
    const purities = await Purity.find().sort({ createdAt: -1 });
    res.json(purities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a purity
exports.createPurity = async (req, res) => {
  try {
    const { name, metal } = req.body;
    if (!name || !metal) {
      return res.status(400).json({ error: "Name and metal are required." });
    }

    const purity = new Purity({ name, metal });
    await purity.save();
    res.status(201).json(purity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a purity
exports.updatePurity = async (req, res) => {
  try {
    const { name, metal } = req.body;
    const purity = await Purity.findByIdAndUpdate(
      req.params.id,
      { name, metal },
      { new: true }
    );
    if (!purity) {
      return res.status(404).json({ error: "Purity not found." });
    }
    res.json(purity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a purity
exports.deletePurity = async (req, res) => {
  try {
    const purity = await Purity.findByIdAndDelete(req.params.id);
    if (!purity) {
      return res.status(404).json({ error: "Purity not found." });
    }
    res.json({ message: "Purity deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
