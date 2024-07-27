const { validateFormFields } = require("../../src/utils/validator");
const { mockDatabaseService } = require("../mockData");

describe("validateFormFields", () => {
  beforeAll(() => {
    jest.mock("../../src/utils/databaseService", () => mockDatabaseService);
  });

  it("should return true for valid data matching form fields", async () => {
    const validData = {
      date: "2024-07-25",
      employee: "Dino",
      quantity: 10,
    };

    const result = await validateFormFields("form1", validData);

    expect(result).toBe(true);
  });

  it("should return false for data missing required fields", async () => {
    const invalidData = {
      date: "2024-07-25",
      employee: "Dino",
    };

    const result = await validateFormFields("form1", invalidData);

    expect(result).toBe(false);
  });

  it("should return false for data containing extra fields", async () => {
    const invalidData = {
      date: "2024-07-25",
      employee: "Dino",
      quantity: 10,
      extra_field: "not allowed",
    };

    const result = await validateFormFields("form1", invalidData);

    expect(result).toBe(false);
  });

  it("should return false for non-existent form ID", async () => {
    const validData = {
      date: "2024-07-25",
      employee: "Dino",
      quantity: 10,
    };

    const result = await validateFormFields("invalid_form", validData);

    expect(result).toBe(false);
  });
});
