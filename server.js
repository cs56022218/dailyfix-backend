import express from "express";
import cors from "cors"; // นำเข้า cors
import dotenv from "dotenv";
import mongoose from "mongoose";
import dailyReportRoutes from "./src/routes/dailyReportRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import issueRoutes from "./src/routes/issueRoutes.js";
dotenv.config(); // โหลดค่า environment variables จาก .env

const app = express();

// เปิดใช้ CORS
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use(express.json());

// Routes

app.use("/api/daily-reports", dailyReportRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
