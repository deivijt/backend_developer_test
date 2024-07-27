const request = require("supertest");

const app = require("../../src/app");
const {
  calculateFermentationSummary,
} = require("../../src/api/fermentation/services/fermentationService");

describe("Fermentation Records CRUD", () => {
  const userId = "user1";
  const accountId = "account2";
  const headers = { Authorization: userId };

  describe("POST /api/fermentations/accounts/:accountId", () => {
    it("should create a fermentation record", async () => {
      const fermentationData = {
        start_date: "2023-10-01",
        end_date: "2023-10-05",
        input: 300,
        output: 285,
      };

      const response = await request(app)
        .post(`/api/fermentations/accounts/${accountId}`)
        .set(headers)
        .send(fermentationData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(fermentationData));
    });

    it("should return 400 if end_date is before start_date", async () => {
      const invalidData = {
        start_date: "2023-10-05",
        end_date: "2023-10-01",
        input: 300,
        output: 285,
      };

      const response = await request(app)
        .post(`/api/fermentations/accounts/${accountId}`)
        .set(headers)
        .send(invalidData);

      expect(response.statusCode).toBe(400);
    });

    it("should return 400 if output is greater than input", async () => {
      const invalidData = {
        start_date: "2023-10-01",
        end_date: "2023-10-05",
        input: 285,
        output: 300,
      };

      const response = await request(app)
        .post(`/api/fermentations/accounts/${accountId}`)
        .set(headers)
        .send(invalidData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/fermentations/accounts/:accountId", () => {
    it("should return fermentation records", async () => {
      const response = await request(app)
        .get(`/api/fermentations/accounts/${accountId}`)
        .set({ Authorization: userId });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("summary");
      expect(response.body.summary).toHaveProperty("avg_days");
      expect(response.body.summary).toHaveProperty("avg_weight_loss");

      expect(Array.isArray(response.body.data)).toBe(true);

      response.body.data.forEach((record) => {
        expect(record).toHaveProperty("start_date");
        expect(record).toHaveProperty("end_date");
        expect(record).toHaveProperty("input");
        expect(record).toHaveProperty("output");
      });
    });
  });

  describe("PUT /api/fermentations/accounts/:accountId/:fermentationId", () => {
    it("should return 400 if end_date is before start_date", async () => {
      const fermentationId = "fermentation1";
      const invalidData = {
        start_date: "2023-10-05",
        end_date: "2023-10-01",
        input: 300,
        output: 285,
      };

      const response = await request(app)
        .put(`/api/fermentations/accounts/${accountId}/${fermentationId}`)
        .set(headers)
        .send(invalidData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain(
        "end_date must be after start_date"
      );
    });

    it("should return 400 if output is greater than input", async () => {
      const fermentationId = "fermentation1";
      const invalidData = {
        start_date: "2023-10-01",
        end_date: "2023-10-05",
        input: 285,
        output: 300,
      };

      const response = await request(app)
        .put(`/api/fermentations/accounts/${accountId}/${fermentationId}`)
        .set(headers)
        .send(invalidData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain(
        "output must be less than or equal to input"
      );
    });

    it("should update a fermentation record", async () => {
      const fermentationId = "fermentation1";
      const updatedData = {
        start_date: "2023-10-02",
        end_date: "2023-10-06",
        input: 310,
        output: 290,
      };

      const response = await request(app)
        .put(`/api/fermentations/accounts/${accountId}/${fermentationId}`)
        .set(headers)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(updatedData));
    });
  });

  describe("DELETE /api/fermentations/accounts/:accountId/:fermentationId", () => {
    it("should delete a fermentation record", async () => {
      const fermentationId = "fermentation1";

      const response = await request(app)
        .delete(`/api/fermentations/accounts/${accountId}/${fermentationId}`)
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Record deleted" });
    });

    it("should return 404 if the record does not exist", async () => {
      const nonExistentId = "nonExistentId";

      const response = await request(app)
        .delete(`/api/fermentations/accounts/${accountId}/${nonExistentId}`)
        .set(headers);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Record not found" });
    });
  });

  describe("Fermentation Summary Calculation", () => {
    it("should calculate correct summary for valid data", async () => {
      const testData = [
        {
          start_date: "2023-10-01",
          end_date: "2023-10-05",
          input: 300,
          output: 285,
        },
        {
          start_date: "2023-10-06",
          end_date: "2023-10-11",
          input: 400,
          output: 380,
        },
      ];

      const result = await calculateFermentationSummary(testData);

      expect(result.summary.avg_days).toBeCloseTo(4.5, 5);
      expect(result.summary.avg_weight_loss).toBeCloseTo(0.05, 5);
    });

    it("should return zero values for empty data", async () => {
      const result = await calculateFermentationSummary([]);

      expect(result.summary.avg_days).toBe(0);
      expect(result.summary.avg_weight_loss).toBe(0);
    });
  });
});
