const express = require("express");
const router = express.Router();
const metalRateController = require("../controllers/metalRateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",protect, metalRateController.getRates);
router.get("/latest",protect, metalRateController.getLatestRate);
router.post("/", protect, metalRateController.createRate);

module.exports = router;
