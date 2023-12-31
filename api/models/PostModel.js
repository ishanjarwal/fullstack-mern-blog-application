const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: false },
    aid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    summary: { type: String, default: null },
    thumbnail: { type: String, required: true },
    draft: { type: Boolean, default: false }
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)
exports.Post = Post;