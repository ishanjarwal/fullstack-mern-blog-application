const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    const { user } = req.cookies;
    if (!user) {
        res.json({ auth: false });
    }
    jwt.verify(user, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.json({ err: err });
        };
        req.userId = decoded.uid;
        next();
    })
}