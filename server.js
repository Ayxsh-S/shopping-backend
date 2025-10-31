import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

const carsFilePath = path.resolve("./db.json");
let cars = [];

try {
  const data = fs.readFileSync(carsFilePath, "utf-8");
  cars = JSON.parse(data);
} catch (err) {
  console.error("Error reading db.json:", err);
}

app.get("/cars", (req, res) => {
  const cars = data.models.flatMap((model) =>
    model.variants.map((v) => ({
      ...v,
      modelName: model.name,
    }))
  );
  res.json(cars);
});
