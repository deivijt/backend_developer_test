// galapp/tests/fermentationPermissionMiddleware.test.js

const fermentationPermissionMiddleware = require("../../src/api/fermentation/middlewares/fermentationPermissionMiddleware");
const databaseService = require("../../src/utils/databaseService");

jest.mock("../../src/utils/databaseService");

describe("Fermentation Permission Middleware", () => {
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
      roles: { role1: { permissions: { form3: { create: true } } } },
    });

    await fermentationPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 403 for user without correct permissions", async () => {
    databaseService.get.mockResolvedValueOnce({
      accounts: { account1: { role: "role2" } },
    });
    databaseService.get.mockResolvedValueOnce({
      roles: { role2: { permissions: { form3: { create: false } } } },
    });

    await fermentationPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "User does not have create permission for fermentation form",
    });
  });

  it("should return 404 for non-existent account", async () => {
    databaseService.get.mockResolvedValueOnce({
      accounts: { account1: { role: "role1" } },
    });
    databaseService.get.mockResolvedValueOnce(null);

    await fermentationPermissionMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Account not found" });
  });
});
