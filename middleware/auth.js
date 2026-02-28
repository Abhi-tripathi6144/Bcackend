const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Access Denied" });
    }
  } else {
    console.log("hhahh")
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { protect };
