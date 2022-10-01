/* This code is a middleware function that verifies the token. */
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded =  await jwt.verify(token, config.TOKEN_KEY);
    
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
