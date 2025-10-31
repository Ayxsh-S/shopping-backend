import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadCars() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, "db.json"), "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read db.json:", err);
    return [];
  }
}

app.get("/cars", async (req, res) => {
  const cars = await loadCars();
  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
