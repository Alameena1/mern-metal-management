const express = require("express");
const router = express.Router();
const metalRateController = require("../controllers/metalRateController");

router.get("/", metalRateController.getRates);
router.get("/latest", metalRateController.getLatestRate);
router.post("/", metalRateController.createRate);

module.exports = router;
