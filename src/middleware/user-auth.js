const express = require('express');
const jwt = require('jsonwebtoken');
const register = require('../models/registers');
const app = express();




module.exports = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(app.locals.isGoogleAuth);
    if (token) {
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            const user = await register.findOne({ _id: payload._id });

            // Set the user information in res.locals or app.locals for easy access in route handlers
            res.locals.user = user;

            next(); // Move to the next middleware or route handler
        } catch (error) {
            console.error(error);
            // Handle invalid or expired tokens
            res.status(401).send("unauthorised");
        }
    } else {
        // Handle the case where the JWT cookie is not present
        res.status(401).send("unauthorised");
    }
}

