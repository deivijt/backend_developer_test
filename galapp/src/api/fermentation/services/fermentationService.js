const databaseService = require("../../../utils/databaseService");

const fermentationService = {
  async getFermentationRecords(accountId) {
    const fermentations = await this.getFermentationsByAccountId(accountId);

    const result = await this.calculateFermentationSummary(fermentations);

    return result;
  },

  async createFermentationRecord({ userId, accountId, fermentationData }) {
    fermentationData.user_id = userId;
    fermentationData.account_id = accountId;

    const result = await databaseService.post(
      "fermentations",
      fermentationData
    );

    return result;
  },

  async updateFermentationRecord({
    accountId,
    fermentationId,
    fermentationData,
  }) {
    const existingRecord = await databaseService.get(
      "fermentations",
      fermentationId
    );

    if (!existingRecord || existingRecord.account_id !== accountId) {
      throw new Error("Record not found or does not belong to the account");
    }

    const updatedRecord = {
      ...existingRecord,
      ...fermentationData,
    };

    const result = await databaseService.put(
      "fermentations",
      fermentationId,
      updatedRecord
    );

    return result;
  },

  async deleteFermentationRecord({ accountId, fermentationId }) {
    const existingRecord = await databaseService.get(
      "fermentations",
      fermentationId
    );

    if (!existingRecord || existingRecord.account_id !== accountId) {
      return null;
    }

    await databaseService.delete("fermentations", fermentationId);
    return true;
  },

  async getFermentationsByAccountId(accountId) {
    const records = await databaseService.get("fermentations");

    const filteredRecords = Object.values(records).filter(
      (record) => record.account_id === accountId
    );

    return filteredRecords;
  },

  async calculateFermentationSummary(fermentationsData) {
    let totalDays = 0;
    let totalWeightLoss = 0;
    let totalInput = 0;

    fermentationsData.forEach((record) => {
      const startDate = new Date(record.start_date);
      const endDate = new Date(record.end_date);

      totalDays += (endDate - startDate) / (1000 * 60 * 60 * 24);
      totalWeightLoss += record.input - record.output;
      totalInput += record.input;
    });

    const avgDays =
      fermentationsData.length > 0 ? totalDays / fermentationsData.length : 0;

    const avgWeightLoss = totalInput > 0 ? totalWeightLoss / totalInput : 0;

    return {
      data: fermentationsData,
      summary: {
        avg_days: avgDays,
        avg_weight_loss: avgWeightLoss,
      },
    };
  },
};

module.exports = fermentationService;
