const { body, check } = require("express-validator");

exports.signupValidate = [
    //fullname
    body('fullname').isLength({ max: 50 }).withMessage("Name shouldn't be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.')
        .custom((value) => {
            if (value.trim().split(' ').length > 2) {
                return false;
            } else {
                return true;
            }
        }).withMessage("Only 2 words are allowed in a name")
    ,
    // email
    body('email', "Invalid Email").isEmail().trim().normalizeEmail(),
    // password
    body('password').isLength({ min: 8 }).withMessage("Atleast 8 characters long")
        .custom(value => !/\s/.test(value)).withMessage("Passwords can't contain spaces.")
]

exports.postValidate = [
    body('title').not().isEmpty().withMessage("Title can't be empty")
        .isLength({ max: 150 }).withMessage("Title shouldn't be more than 150 characters"),
    body('summary').not().isEmpty().withMessage("Summary can't be empty")
        .isLength({ max: 300 }).withMessage("Summary shouldn't be more than 300 words"),
    body('content').not().isEmpty().withMessage("Content can't be empty."),
    body('category').not().isEmpty().withMessage("Please select a category."),
    check('thumbnail').custom((value, { req }) => {
        if (req.file) {
            return true;
        } else {
            return false;
        }
    }).withMessage("Please upload a thumbnail."),
    body('tags').custom((value) => {
        if (JSON.parse(value).length < 5) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Atleast 5 tags.')
        .custom((value) => {
            if (JSON.parse(value).length > 15) {
                return false;
            } else {
                return true;
            }
        }).withMessage('Atmost 15 tags.')
]

exports.updatePostValidate = [
    body('title').not().isEmpty().withMessage("Title can't be empty")
        .isLength({ max: 150 }).withMessage("Title shouldn't be more than 150 characters"),
    body('summary').not().isEmpty().withMessage("Summary can't be empty")
        .isLength({ max: 300 }).withMessage("Summary shouldn't be more than 300 words"),
    body('content').not().isEmpty().withMessage("Content can't be empty."),
    body('category').not().isEmpty().withMessage("Please select a category."),
    body('tags').custom((value) => {
        if (JSON.parse(value).length < 5) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Atleast 5 tags.')
        .custom((value) => {
            if (JSON.parse(value).length > 15) {
                return false;
            } else {
                return true;
            }
        }).withMessage('Atmost 15 tags.')
]

exports.profileValidate = [
    check("fullname").not().isEmpty().withMessage("Name can't be empty"),
    check('email', "Invalid Email").isEmail().trim().normalizeEmail(),
]