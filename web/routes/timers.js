import express from "express";
import Timer from "../models/Timer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { shop } = req.query;
  const timers = await Timer.find({ shop });
  res.json(timers);
});

router.post("/", async (req, res) => {
  const timer = await Timer.create(req.body);
  res.json(timer);
});

export default router;
