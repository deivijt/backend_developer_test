const axios = require("axios");

const { DATABASE_URL, DATABASE_PORT } = process.env;

const databaseService = {
  async get(entity, id = "") {
    const response = await axios.get(
      `${DATABASE_URL}:${DATABASE_PORT}/${entity}${id ? `/${id}` : ""}`
    );

    return response.data;
  },

  async post(entity, data) {
    const response = await axios.post(
      `${DATABASE_URL}:${DATABASE_PORT}/${entity}`,
      data
    );

    return response.data;
  },

  async put(entity, id, data) {
    const response = await axios.put(
      `${DATABASE_URL}:${DATABASE_PORT}/${entity}/${id}`,
      data
    );

    return response.data;
  },

  async delete(entity, id) {
    const response = await axios.delete(
      `${DATABASE_URL}:${DATABASE_PORT}/${entity}/${id}`
    );

    return response.data;
  },
};

module.exports = databaseService;
