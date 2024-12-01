import express from "express";
import {
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";

const router = express.Router();

// Route to get all issues
router.get("/", getIssues);

// Route to get a specific issue by ID
router.get("/:id", getIssueById);

// Route to create a new issue
router.post("/", createIssue);

// Route to update a specific issue by ID
router.put("/:id", updateIssue);

// Route to delete a specific issue by ID
router.delete("/:id", deleteIssue);

export default router;
