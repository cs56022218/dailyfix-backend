// routes/issueRoutes.js
import express from "express";
import {
  registerUser,
  getUsersList,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);

// Route to get uid and name of all users
router.get("/all", getUsersList);
router.put("/:uid", updateUser);
export default router;
