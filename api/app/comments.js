const express = require('express');
const mongoose = require("mongoose");
const Comment = require("../models/Comment")
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const query = {}
        if (req.query.post) {
            query.post = req.query.post
        }
        const comments = await Comment.find(query).sort({_id: -1}).populate('user', 'displayName');

        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth,  async (req, res, next) => {
    try {
        if (!req.body.text || !req.body.post) {
            return res.status(400).send({message: 'Text and postID are required'});
        }

        const commentData = {
            text: req.body.text,
            post: req.body.post,
            user: req.user._id
        };

        const comment = new Comment(commentData);

        await comment.save();

        return res.send({message: 'Created new comment', id: comment._id});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;
