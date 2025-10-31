import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
const carsFilePath = path.resolve("./db.json");
let db = {};

try {
  const fileData = fs.readFileSync(carsFilePath, "utf-8");
  db = JSON.parse(fileData);
  console.log("Loaded db.json successfully");
} catch (err) {
  console.error("Error reading db.json:", err);
}

app.get("/cars", (req, res) => {
  if (!db.models) {
    return res.status(500).json({ error: "No models data found" });
  }
  const cars = db.models.flatMap((model) =>
    model.variants.map((v) => ({
      ...v,
      modelName: model.name,
      modelId: model.id,
    }))
  );
  res.json(cars);
});

app.get("/models", (req, res) => {
  res.json(db.models || []);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
