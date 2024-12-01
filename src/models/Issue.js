// models/Issue.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issue_type: { type: String, enum: ["request", "bug"] },
    issue_date: Date,
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    note: String,
    status: String,
    priority: { type: String, enum: ["minor", "major", "critical"] },
    ship_date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
