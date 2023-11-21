const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAuthor: { type: Boolean, default: false },
    profile: { type: String, default: 'default.jpg' },
    bio: { type: String, default: null },
    insta: { type: String, default: null },
    linkedin: { type: String, default: null },
    youtube: { type: String, default: null },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
exports.User = User;