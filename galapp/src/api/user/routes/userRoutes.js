const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/accounts-forms", userController.getAccountsAndForms);

module.exports = router;
