const express = require("express");

const fermentationController = require("../controllers/fermentationController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const fermentationPermissionMiddleware = require("../middlewares/fermentationPermissionMiddleware");

const router = express.Router();

router.get(
  "/accounts/:accountId",
  authMiddleware,
  fermentationPermissionMiddleware,
  fermentationController.getFermentationRecords
);

router.post(
  "/accounts/:accountId",
  authMiddleware,
  fermentationPermissionMiddleware,
  fermentationController.createFermentationRecord
);

router.put(
  "/accounts/:accountId/:fermentationId",
  authMiddleware,
  fermentationPermissionMiddleware,
  fermentationController.updateFermentationRecord
);

router.delete(
  "/accounts/:accountId/:fermentationId",
  authMiddleware,
  fermentationPermissionMiddleware,
  fermentationController.deleteFermentationRecord
);

module.exports = router;
