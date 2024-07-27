const express = require("express");

const userRoutes = require("./api/user/routes/userRoutes");
const harvestRoutes = require("./api/harvest/routes/harvestRoutes");
const fermentationRoutes = require("./api/fermentation/routes/fermentationRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/harvests", harvestRoutes);
app.use("/api/fermentations", fermentationRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
