import DailyReport from "../models/DailyReport.js";

// Get all daily reports
export const getDailyReports = async (req, res) => {
  try {
    const reports = await DailyReport.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single daily report by ID
export const getDailyReportById = async (req, res) => {
  try {
    const report = await DailyReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new daily report
export const createDailyReport = async (req, res) => {
  const { task, type_work, problem, due_date, status, ship_date } = req.body;

  try {
    const newReport = new DailyReport({
      task,
      type_work,
      problem,
      due_date,
      status,
      ship_date,
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing daily report
export const updateDailyReport = async (req, res) => {
  const { task, type_work, problem, due_date, status, ship_date } = req.body;

  try {
    const report = await DailyReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.task = task;
    report.type_work = type_work;
    report.problem = problem;
    report.due_date = due_date;
    report.status = status;
    report.ship_date = ship_date;

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a daily report
export const deleteDailyReport = async (req, res) => {
  const { id } = req.params; // รับ ID จาก params

  try {
    const report = await DailyReport.findByIdAndDelete(id); // ลบเอกสาร
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Server error" });
  }
};
