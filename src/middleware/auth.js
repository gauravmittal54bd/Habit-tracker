const jwt = require('jsonwebtoken');
const Register = require('../models/registers');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // If JWT is not provided, set a message and continue to the secret page
      req.message = "Please authenticate before accessing the secret page!";
      return next();
    }

    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Register.findOne({ _id: verifyuser._id });
    
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    
    res.status(401).send(error);
  }
}

module.exports = auth;
