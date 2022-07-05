const express = require("express");
const verifyToken = require("../middleware/auth");

const router = express.Router();
const Post = require("../models/Post");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            msg: "Title is required",
        });
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith("https://") ? url : `https://${url}`,
            status: status || "TO LEARN",
            user: "62c4501ba93b04d6d20d92fc",
        });
        await newPost.save();

        res.json({
            success: true,
            msg: "Happy learning",
            post: newPost,
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
