import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
const modelsFilePath = path.resolve("./models.json");
const carsFilePath = path.resolve("./cars.json");

const getModels = () => {
  try {
    const data = fs.readFileSync(modelsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(Error reading models.json:", err);
    return [];
  }
};

const getCars = () => {
  try {
    const data = fs.readFileSync(carsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading cars.json:", err);
    return [];
  }
};
app.get("/models", (req, res) => {
  const models = getModels();
  res.json(models);
});

app.get("/cars", (req, res) => {
  const cars = getCars();
  res.json(cars);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
