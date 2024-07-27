const request = require("supertest");
const app = require("../../src/app");

describe("GET /api/users/:userId/accounts-forms", () => {
  it("should return 200 OK for existing user", async () => {
    const response = await request(app).get("/api/users/user1/accounts-forms");
    expect(response.statusCode).toBe(200);
  });

  it("should return a JSON object", async () => {
    const response = await request(app).get("/api/users/user1/accounts-forms");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("should return the correct data structure", async () => {
    const response = await request(app).get("/api/users/user1/accounts-forms");

    expect(response.body).toEqual(
      expect.objectContaining({
        accounts: expect.any(Array),
        forms: expect.any(Array),
      })
    );

    response.body.accounts.forEach((account) => {
      expect(typeof account).toBe("string");
    });

    response.body.forms.forEach((form) => {
      expect(form).toEqual(
        expect.objectContaining({
          account: expect.any(String),
          form: expect.any(String),
        })
      );
    });
  });

  it.each([
    [
      "user1",
      ["Café", "Cacao"],
      [
        { account: "Café", form: "Cosecha" },
        { account: "Café", form: "Secado" },
        { account: "Cacao", form: "Cosecha" },
        { account: "Cacao", form: "Fermentación" },
      ],
    ],
    [
      "user2",
      ["Café"],
      [
        { account: "Café", form: "Cosecha" },
        { account: "Café", form: "Secado" },
      ],
    ],
    [
      "user3",
      ["Cacao"],
      [
        { account: "Cacao", form: "Cosecha" },
        { account: "Cacao", form: "Fermentación" },
      ],
    ],
  ])(
    "should return correct accounts and forms for %s",
    async (userId, expectedAccounts, expectedForms) => {
      const response = await request(app).get(
        `/api/users/${userId}/accounts-forms`
      );

      expect(response.body.accounts).toEqual(expectedAccounts);
      expect(response.body.forms).toEqual(expectedForms);
    }
  );

  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get(
      "/api/users/nonexistent/accounts-forms"
    );
    expect(response.statusCode).toBe(404);
  });
});
