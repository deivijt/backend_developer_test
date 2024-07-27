// galapp/tests/harvestPermissionMiddleware.test.js

const harvestPermissionMiddleware = require("../../src/api/harvest/middlewares/harvestPermissionMiddleware");
const databaseService = require("../../src/utils/databaseService");

jest.mock("../../src/utils/databaseService");

describe("Harvest Permission Middleware", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      userId: "user1",
      params: { accountId: "account1" },
      method: "POST",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should call next() for user with correct permissions", async () => {
    databaseService.get.mockResolvedValueOnce({
      accounts: { account1: { role: "role1" } },
    });
    databaseService.get.mockResolvedValueOnce({
      roles: { role1: { permissions: { form1: { create: true } } } },
    });

    await harvestPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 403 for user without correct permissions", async () => {
    databaseService.get.mockResolvedValueOnce({
      accounts: { account1: { role: "role2" } },
    });
    databaseService.get.mockResolvedValueOnce({
      roles: { role2: { permissions: { form1: { create: false } } } },
    });

    await harvestPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "User does not have create permission for harvest form",
    });
  });

  it("should return 404 for non-existent account", async () => {
    databaseService.get.mockResolvedValueOnce({
      accounts: { account1: { role: "role1" } },
    });

    databaseService.get.mockResolvedValueOnce(null);

    await harvestPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Account not found" });
  });
});
