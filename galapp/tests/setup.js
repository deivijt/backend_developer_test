require("dotenv").config();

const { mockDatabaseService } = require("./mockData");

jest.mock("../src/utils/databaseService", () => {
  const { mockDatabaseService } = require("./mockData");

  return mockDatabaseService;
});

beforeEach(() => {
  mockDatabaseService.get.mockClear();
  mockDatabaseService.post.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});
