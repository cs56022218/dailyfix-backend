import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { uid, name, email, password, avatarURL } = req.body;
  try {
    // Create a new user document in MongoDB
    const newUser = new User({
      uid,
      name,
      email,
      password, // Consider hashing the password before saving
      avatarURL,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Get list of users (only uid and name)
export const getUsersList = async (req, res) => {
  try {
    // Fetch only uid and name fields for all users
    const users = await User.find({}, "uid name");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Update a user by UID
export const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { name, email, avatarURL } = req.body; // รับข้อมูลที่ต้องการอัปเดต

  try {
    // ค้นหาและอัปเดตข้อมูลผู้ใช้ตาม uid
    const user = await User.findOneAndUpdate(
      { uid }, // ค้นหาตาม uid
      { name, email, avatarURL }, // ข้อมูลที่จะอัปเดต
      { new: true, runValidators: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไป
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};
