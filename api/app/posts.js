const express = require('express');
const mongoose = require("mongoose");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().sort({_id: -1}).populate("user", "displayName");

        return res.send(posts);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("user", "displayName");

        if (!post) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(post);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title is required'});
        }

        const postData = {
            title: req.body.title,
            description: null,
            image: null,
            dateTime: new Date().toISOString(),
            user: req.user._id
        };

        if (req.body.description) {
            postData.description = req.body.description;
        }

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);

        await post.save();

        return res.send({message: 'Created new post', id: post._id});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;
