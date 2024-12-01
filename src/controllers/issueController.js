import Issue from "../models/Issue.js";
import User from "../models/User.js";

// Helper function to get User _id by Firebase UID
const getUserIdByFirebaseUID = async (firebaseUID) => {
  const user = await User.findOne({ uid: firebaseUID });
  return user ? user._id : null;
};

// Get all issues
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("assigned_to created_by");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate(
      "assigned_to created_by"
    );
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new issue
export const createIssue = async (req, res) => {
  const {
    issue_type,
    issue_date,
    note,
    status,
    priority,
    ship_date,
    assigned_to,
    created_by,
  } = req.body;

  try {
    // Find User _id based on Firebase UID for assigned_to and created_by
    const assignedById = await getUserIdByFirebaseUID(assigned_to);
    const createdById = await getUserIdByFirebaseUID(created_by);

    if (!assignedById || !createdById) {
      return res
        .status(400)
        .json({ message: "User not found for assigned_to or created_by" });
    }

    const newIssue = new Issue({
      issue_type,
      issue_date: new Date(),
      assigned_to: assignedById,
      created_by: createdById,
      note,
      status,
      priority,
      ship_date,
    });

    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing issue
export const updateIssue = async (req, res) => {
  const {
    issue_type,
    issue_date,
    note,
    status,
    priority,
    assigned_to,
    created_by,
  } = req.body;

  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // Find User _id based on Firebase UID for assigned_to and created_by
    const assignedById = await getUserIdByFirebaseUID(assigned_to);
    const createdById = await getUserIdByFirebaseUID(created_by);

    if (!assignedById || !createdById) {
      return res
        .status(400)
        .json({ message: "User not found for assigned_to or created_by" });
    }

    // Update issue fields
    issue.issue_type = issue_type;
    issue.issue_date = issue_date;
    issue.assigned_to = assignedById;
    issue.created_by = createdById;
    issue.note = note;
    issue.status = status;
    issue.priority = priority;

    // Set ship_date to the current date if status is not "open"
    issue.ship_date = status == "closed" ? new Date() : issue.ship_date;

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an issue
export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ message: "Server error" });
  }
};
