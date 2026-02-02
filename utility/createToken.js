const jwt = require("jsonwebtoken");

const generateToken = (email, id) => {
    return jwt.sign(
        {email,id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"30d"}
    );
}

module.exports = {generateToken};