const request = require("supertest");
const app = require("../../src/app");
const { mockDatabaseService } = require("../mockData");

describe("POST /harvests/:accountId", () => {
  it("should return 201 Created for valid request", async () => {
    const requestData = {
      date: "2024-07-25",
      employee: "Dino",
      quantity: 10,
    };

    const response = await request(app)
      .post("/api/harvests/accounts/account1")
      .set("Authorization", "user1")
      .send(requestData);

    expect(response.statusCode).toBe(201);
    expect(mockDatabaseService.post).toHaveBeenCalledWith("harvest", {
      ...requestData,
      user_id: "user1",
      account_id: "account1",
    });
  });
});
