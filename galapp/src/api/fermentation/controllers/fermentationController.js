const fermentationService = require("../services/fermentationService");
const { validateFormFields } = require("../../../utils/validator");
const validateFermentationData = require("../utils/validateFermentationData");

const fermentationController = {
  async getFermentationRecords(req, res) {
    try {
      const { accountId } = req.params;

      const result = await fermentationService.getFermentationRecords(
        accountId
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createFermentationRecord(req, res) {
    try {
      const { userId } = req;
      const { accountId } = req.params;
      const fermentationData = req.body;

      const areFieldsValid = await validateFormFields(
        "form3",
        fermentationData
      );

      if (!areFieldsValid) {
        return res
          .status(400)
          .json({ error: "Bad Request: Missing or invalid fields" });
      }

      const { isValid: isFermentationDataValid, message } =
        validateFermentationData(fermentationData);

      if (!isFermentationDataValid) {
        return res.status(400).json({ error: `Bad Request: ${message}` });
      }

      const result = await fermentationService.createFermentationRecord({
        userId,
        accountId,
        fermentationData,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateFermentationRecord(req, res) {
    try {
      const { accountId, fermentationId } = req.params;
      const fermentationData = req.body;

      const areFieldsValid = await validateFormFields(
        "form3",
        fermentationData
      );

      if (!areFieldsValid) {
        return res
          .status(400)
          .json({ error: "Bad Request: Missing or invalid fields" });
      }

      const { isValid: isFermentationDataValid, message } =
        validateFermentationData(fermentationData);

      if (!isFermentationDataValid) {
        return res.status(400).json({ error: `Bad Request: ${message}` });
      }

      const result = await fermentationService.updateFermentationRecord({
        accountId,
        fermentationId,
        fermentationData,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteFermentationRecord(req, res) {
    try {
      const { accountId, fermentationId } = req.params;

      const result = await fermentationService.deleteFermentationRecord({
        accountId,
        fermentationId,
      });

      if (!result) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.status(200).json({ message: "Record deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = fermentationController;
