const userService = require("../services/userService");

const userController = {
  async getAccountsAndForms(req, res) {
    try {
      const { userId } = req.params;

      const result = await userService.getUserAccessibleAccountsAndForms(
        userId
      );

      res.json(result);
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({ error: "User not found" });
      } else {
        console.error("Error in getAccountsAndForms:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
};

module.exports = userController;
