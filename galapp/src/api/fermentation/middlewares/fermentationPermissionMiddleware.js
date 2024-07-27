const databaseService = require("../../../utils/databaseService");

const fermentationPermissionMiddleware = async (req, res, next) => {
  try {
    const { userId } = req;
    const { accountId } = req.params;

    const user = await databaseService.get("users", userId);
    const account = await databaseService.get("accounts", accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const userRole = user.accounts[accountId]?.role;
    const permissions = account.roles[userRole]?.permissions?.form3;

    if (!permissions) {
      return res
        .status(403)
        .json({ error: "User does not have access to fermentation form" });
    }

    const method = req.method.toLowerCase();
    let requiredPermission;

    switch (method) {
      case "get":
        requiredPermission = "read";
        break;
      case "post":
        requiredPermission = "create";
        break;
      case "put":
      case "patch":
        requiredPermission = "update";
        break;
      case "delete":
        requiredPermission = "delete";
        break;
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!permissions[requiredPermission]) {
      return res
        .status(403)
        .json({
          error: `User does not have ${requiredPermission} permission for fermentation form`,
        });
    }

    next();
  } catch (error) {
    console.error("Error in fermentationPermissionMiddleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fermentationPermissionMiddleware;
