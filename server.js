import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
const dbPath = path.resolve("./db.json");
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return { cars: [], models: [] };
  }
};

app.get("/cars", (req, res) => {
  const db = readDB();
  if (!Array.isArray(db.cars)) {
    return res.status(500).json({ error: "Cars data is not an array" });
  }
  res.json(db.cars);
});

app.get("/models", (req, res) => {
  const db = readDB();
  if (!Array.isArray(db.models)) {
    return res.status(500).json({ error: "Models data is not an array" });
  }
  res.json(db.models);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
