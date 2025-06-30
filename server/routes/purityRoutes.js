const express = require("express");
const router = express.Router();
const purityController = require("../controllers/purityController");

router.get("/", purityController.getPurities);
router.post("/", purityController.createPurity);
router.put("/:id", purityController.updatePurity);
router.delete("/:id", purityController.deletePurity);

module.exports = router;
