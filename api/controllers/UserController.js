require('dotenv').config();
const { User } = require("../models/UserModel.js")
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path')

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() })
    } else {
        let { fullname, email, password } = req.body;
        fullname = fullname.trim().toLowerCase();
        const words = fullname.split(/\W+/);
        if (words.length >= 2) {
            fullname = words[0] + " " + words[1];
        }

        email = email.trim().toLowerCase();
        password = password.trim();

        const check = await User.find({ "email": email });
        if (check.length === 0) {
            const salt = 10;
            const newUser = new User({
                "fullname": fullname,
                "email": email,
                "password": bcrypt.hashSync(password, bcrypt.genSaltSync(salt))
            });
            await newUser.save()
                .then((val) => res.json({ "created": true, "exists": false }))
                .catch((err) => res.json({ "created": false, err: err, "exists": false }))
        } else {
            res.json({ "exists": true, "created": false });
        }
    }
}

exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    const userDoc = await User.findOne({ email: email })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                "uid": userDoc._id,
                "fullname": userDoc.fullname,
                "email": userDoc.email,
                "isAthor": userDoc.isAuthor
            },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('user', token).json({ "pass": true })
                })
        } else {
            res.json({ "pass": false });
        }
    } else {
        res.json({ "exists": false })
    }

}

exports.authUser = async (req, res) => {
    const { user } = await req.cookies;
    if (!user) {
        res.json({ auth: false })
    } else {
        jwt.verify(user, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false })
            }
            res.json({ auth: true })
        })
    }
}

exports.logoutUser = async (req, res) => {
    await res.clearCookie('user').json({ logged: false })
}

exports.getLoggedUser = async (req, res) => {
    const { user } = await req.cookies;
    if (!user) {
        res.json({ auth: false })
    } else {
        let id;
        jwt.verify(user, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, err: err })
            }
            id = decoded.uid;
        })
        const result = await User.findOne({ '_id': id });
        if (result) {
            res.json(result);
        }
    }
}

exports.getAuthor = async (req, res) => {
    let { name } = req.params;
    if (name.indexOf('_') > 0) {
        name = name.split('_')[0] + " " + name.split('_')[1];
    } else {
        name = name;
    }
    const author = await User.findOne({ "fullname": name });
    if (author) {
        const result = {
            fullname: author.fullname,
            email: author.email,
            bio: author.bio,
            profile: author.profile,
            insta: author.insta,
            linkedin: author.linkedin,
            youtube: author.youtube
        }
        res.json({ author: result, foundAuthor: true })
    } else {
        res.json({ foundAuthor: false })
    }
}

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "uploads/profiles", req.file.filename));
        }
        res.json({ errors: errors.array() })
    } else {
        const id = req.userId;
        const { fullname, email, bio, insta, linkedin, youtube } = req.body
        const updatableUser = await User.findOne({ '_id': id });
        if (!updatableUser) {
            res.json({ auth: false });
        }
        if (req.file && updatableUser.thumbnail !== "default.jpg") {
            fs.unlinkSync(path.join(__dirname, "..", "uploads/profiles", updatableUser.profile));
        }
        updatableUser.fullname = fullname;
        updatableUser.email = email;
        updatableUser.bio = bio;
        if (req.file) {
            updatableUser.profile = req.file.filename;
        }
        updatableUser.insta = insta;
        updatableUser.linkedin = linkedin;
        updatableUser.youtube = youtube;
        await updatableUser.save()
            .then(val => {
                res.json({ updatesuccess: true })
            })
            .catch(err => {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, "..", "uploads/profiles", req.file.filename));
                }
                res.json({ err: err, updatesuccess: false })
            })
    }

}