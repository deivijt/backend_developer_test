const harvestService = require("../services/harvestService");
const { validateFormFields } = require("../../../utils/validator");

const harvestController = {
  async createHarvestRecord(req, res) {
    try {
      const { userId } = req;
      const { accountId } = req.params;

      if (!accountId) {
        return res.status(400).json({ error: "Account ID not specified" });
      }

      const harvestData = req.body;

      const areFieldsValid = await validateFormFields("form1", harvestData);

      if (!areFieldsValid) {
        return res
          .status(400)
          .json({ error: "Bad Request: Missing or invalid fields" });
      }

      const result = await harvestService.createHarvestRecord({
        userId,
        accountId,
        harvestData,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error("Error in createHarvestRecord:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = harvestController;
