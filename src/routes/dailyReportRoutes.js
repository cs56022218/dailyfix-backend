import express from "express";
import {
  getDailyReports,
  getDailyReportById,
  createDailyReport,
  updateDailyReport,
  deleteDailyReport,
} from "../controllers/dailyReportController.js";

const router = express.Router();

// Routes
router.get("/", getDailyReports);
router.get("/:id", getDailyReportById);
router.post("/", createDailyReport);
router.put("/:id", updateDailyReport);
router.delete("/:id", deleteDailyReport);

export default router;
