const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing username and/or password",
        });
    }
    try {
        // check for existing user
        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "Username already taken",
            });
        }

        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            msg: "User created successfully",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
        });
    }
});

// @route POST api/auth/Login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msg: "Missing username and/or password",
        });
    }
    try {
        // Check for existing user
        const user = await User.findOne({
            username,
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect username and/or password",
            });
        }

        // Username found
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect username and/or password",
            });
        }

        // All good
        // Return token
        // Return token
        const accessToken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            msg: "User logged in  successfully",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
        });
    }
});

module.exports = router;
