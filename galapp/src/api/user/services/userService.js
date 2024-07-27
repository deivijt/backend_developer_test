const databaseService = require("../../../utils/databaseService");

const userService = {
  /**
   * Retrieves the accessible accounts and forms for a given user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Object>} An object containing two arrays:
   *   - accounts: An array of account names the user has access to.
   *   - forms: An array of objects, each containing the account name and form name the user can access.
   * @throws {Error} If there's an issue fetching data from the database.
   */
  async getUserAccessibleAccountsAndForms(userId) {
    const user = await databaseService.get("users", userId);

    if (!user) {
      const error = new Error("User not found");

      error.status = 404;

      throw error;
    }

    const accounts = await databaseService.get("accounts");
    const forms = await databaseService.get("forms");

    const accessibleAccounts = [];
    const accessibleForms = [];

    for (const [accountId, accountInfo] of Object.entries(user.accounts)) {
      accessibleAccounts.push(accountInfo.name);

      const account = accounts[accountId];
      const role = account.roles[accountInfo.role];

      for (const [formId, permissions] of Object.entries(role.permissions)) {
        if (permissions.read) {
          accessibleForms.push({
            account: accountInfo.name,
            form: forms[formId].name,
          });
        }
      }
    }

    return {
      accounts: accessibleAccounts,
      forms: accessibleForms,
    };
  },
};

module.exports = userService;
