const databaseService = require("../utils/databaseService");

const authMiddleware = async (req, res, next) => {
  const userId = req.headers.authorization;

  if (!userId) {
    return res.status(403).json({ error: "User not specified in headers" });
  }

  try {
    const user = await databaseService.get("users", userId);

    if (!user) {
      return res.status(404).json({ error: "Not Found: User does not exist" });
    }

    req.userId = userId;
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
