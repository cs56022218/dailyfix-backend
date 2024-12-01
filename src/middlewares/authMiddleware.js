// middleware/authMiddleware.js
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  // ตรวจสอบ token หรือทำการ validate
  try {
    // ถ้า token ถูกต้องให้ next() เพื่อไปยัง controller
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
