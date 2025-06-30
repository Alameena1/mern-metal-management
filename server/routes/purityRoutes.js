const express = require("express");
const router = express.Router();
const purityController = require("../controllers/purityController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", purityController.getPurities);
router.post("/", protect, purityController.createPurity);
router.put("/:id", protect, purityController.updatePurity);
router.delete("/:id", protect,purityController.deletePurity);

module.exports = router;
