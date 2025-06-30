const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const purityRoutes = require("./routes/purityRoutes");
const metalRateRoutes = require("./routes/metalRateRoutes");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/purities", purityRoutes);
app.use("/api/rates", metalRateRoutes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
