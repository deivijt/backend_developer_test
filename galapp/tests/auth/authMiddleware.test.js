const authMiddleware = require("../../src/middlewares/authMiddleware");
const databaseService = require("../../src/utils/databaseService");

jest.mock("../../src/utils/databaseService");

describe("Auth Middleware", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should return 403 if user is not specified in headers", async () => {
    await authMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "User not specified in headers",
    });
  });

  it("should return 404 if user does not exist", async () => {
    mockReq.headers.authorization = "nonexistent";
    databaseService.get.mockResolvedValueOnce(null);

    await authMiddleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Not Found: User does not exist",
    });
  });

  it("should call next() for existing user", async () => {
    mockReq.headers.authorization = "user1";
    databaseService.get.mockResolvedValueOnce({
      id: "user1",
      name: "Test User",
    });

    await authMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.userId).toBe("user1");
    expect(mockReq.user).toEqual({ id: "user1", name: "Test User" });
  });
});
