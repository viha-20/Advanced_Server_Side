const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");

const router = express.Router();

router.post("/create", validateUser, createUser);
router.get("/getAllUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
