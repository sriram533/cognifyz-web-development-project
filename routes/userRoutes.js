const express = require("express");
const router = express.Router();
const User = require("../models/User");


// CREATE USER
router.post("/", async (req, res) => {
    try {

        const { name, email } = req.body;

        const user = new User({
            name,
            email
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// GET ALL USERS
router.get("/", async (req, res) => {
    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;