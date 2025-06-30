const express = require("express");
const router = express.Router();
const metalRateController = require("../controllers/metalRateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", metalRateController.getRates);
router.get("/latest", metalRateController.getLatestRate);
router.post("/", protect, metalRateController.createRate);

module.exports = router;
