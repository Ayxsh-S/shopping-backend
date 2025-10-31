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

app.get("/", (req, res) => {
  res.send("Shopping backend API is running. Use /cars to get the data.");
});

app.get("/cars", (req, res) => {
  res.json(cars);
});
