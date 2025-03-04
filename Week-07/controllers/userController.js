const User = require("../models/User");

// @desc    Create a new user
// @route   POST /api/users


exports.createUser = async (req, res) => {
  console.log("Received data:", req.body); //  Debugging log

  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ firstname, lastname, email, password });
    await user.save();

    console.log("User successfully created:", user); // Debugging log
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};


// @desc    Get all users
// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};



const bcrypt = require("bcryptjs");

exports.updateUser = async (req, res) => {
  try {
    const { password, ...updatedData } = req.body; // Extract password separately

    console.log("Update Request Received:", req.params.id, updatedData); // Debugging log

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt); // Hash the password before saving
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!user) return res.status(404).json({ msg: "User not found" });

    console.log("User Updated Successfully:", user); //  Debugging log
    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};



// @desc    Delete user
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
