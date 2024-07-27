const databaseService = require("../../../utils/databaseService");

const harvestService = {
  /**
   * Creates a new harvest record for a specific user and account.
   *
   * @param {Object} params - The parameters for creating a harvest record.
   * @param {string} params.userId - The ID of the user creating the record.
   * @param {string} params.accountId - The ID of the account associated with the harvest.
   * @param {Object} params.harvestData - The data for the harvest record.
   * @returns {Promise<Object>} The created harvest record.
   * @throws {Error} If there's an issue with the database operation.
   */
  async createHarvestRecord({ userId, accountId, harvestData }) {
    const record = {
      ...harvestData,
      user_id: userId,
      account_id: accountId,
    };

    await databaseService.post("harvest", record);

    return record;
  },
};

module.exports = harvestService;
