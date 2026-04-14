
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authheader = req.headers["Authorization"];

    if (!authheader) {
        return res.status(401).json({message: "Unauthorized access"});
    }

    try {
        const token = authheader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});
    }
};
module.exports = { authMiddleware };