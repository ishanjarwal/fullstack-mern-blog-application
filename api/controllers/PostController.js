const { validationResult } = require('express-validator');
const { Post } = require('../models/PostModel.js')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", req.file.filename))
        }
        res.json({ errors: errors.array() })
    } else {
        const id = req.userId;
        if (req.file) {
            let { title, summary, category, content, isDraft, tags } = req.body;
            title.trim();
            summary.trim();
            const newPost = new Post({
                title: title,
                summary: summary,
                content: content,
                isDraft: isDraft,
                tags: JSON.parse(tags),
                category: category,
                thumbnail: req.file.filename,
                aid: id
            })
            await newPost.save()
                .then(val => res.json({ created: true }))
                .catch(err => {
                    if (req.file) {
                        fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", req.file.filename))
                    }
                    res.json({ err: err, created: false })
                })
        }
    }

}

exports.getPostsByAuthor = async (req, res) => {
    const id = req.userId;
    const results = await Post.find({ aid: id });
    res.json({ results: results })
}

exports.getAllPosts = async (req, res) => {
    const data = await Post.find().populate('aid').sort({ createdAt: -1 });
    res.json(data);
}

exports.getPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({ "_id": id }).populate('aid');
    if (post) {
        res.json({ post: post, invalidRequest: false });
    } else {
        res.json({ invalidRequest: true });
    }
}

exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", req.file.filename))
        }
        res.json({ errors: errors.array() })
    } else {
        let { title, summary, category, content, isDraft, tags } = req.body;
        const { postId } = req.params;
        title.trim();
        summary.trim();
        const updatablePost = await Post.findOne({ "_id": postId });
        if (updatablePost) {
            updatablePost.title = title
            updatablePost.summary = summary
            updatablePost.content = content
            updatablePost.isDraft = isDraft
            updatablePost.tags = JSON.parse(tags)
            updatablePost.category = category
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", updatablePost.thumbnail))
                updatablePost.thumbnail = req.file.filename
            }
            await updatablePost.save()
                .then(val => res.json({ updated: true, invalidPost: false }))
                .catch(err => {
                    if (req.file) {
                        fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", req.file.filename))
                    }
                    res.json({ err: err, updated: false, invalidPost: false })
                })
        } else {
            res.json({ invalidPost: true });
        }
    }
}

exports.deletePost = async (req, res) => {
    const { postId } = req.body;
    const deletablePost = await Post.findById(postId);
    if (deletablePost) {
        fs.unlinkSync(path.join(__dirname, "..", "uploads/thumbnails", deletablePost.thumbnail))
        await Post.deleteOne({ "_id": deletablePost._id });
    } else {
        res.json({ invalidRequest: true })
    }
}

exports.getPostsByCategory = async (req, res) => {
    const { categoryId } = req.body;
    const results = await Post.find({ "category": categoryId })
    res.json({ results: results })
}