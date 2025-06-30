const mongoose = require("mongoose");

const PuritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    metal: {
      type: String,
      required: true,
      enum: ["Gold", "Silver", "Platinum"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purity", PuritySchema);
