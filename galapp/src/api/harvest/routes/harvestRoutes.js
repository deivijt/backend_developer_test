const express = require("express");

const harvestController = require("../controllers/harvestController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const harvestPermissionMiddleware = require("../middlewares/harvestPermissionMiddleware");

const router = express.Router();

router.post(
  "/accounts/:accountId",
  authMiddleware,
  harvestPermissionMiddleware,
  harvestController.createHarvestRecord
);

module.exports = router;
