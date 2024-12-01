import mongoose from "mongoose";

const dailyReportSchema = new mongoose.Schema(
  {
    task: String,
    type_work: String,
    problem: String,
    due_date: Date,
    status: { type: String, enum: ["inprogress", "success"] },
    ship_date: Date,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("DailyReport", dailyReportSchema);
