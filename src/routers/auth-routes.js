// Import required modules
const express = require('express');
const router = new express.Router();
const app = express();

const register = require('../models/registers'); // Import User model
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for working with JSON Web Tokens
const auth = require('../middleware/auth'); // Authentication middleware
const generateRandomPassword = require("../controllers/randompass"); // Controller for generating random passwords
const nodemailer = require('nodemailer'); // Library for sending emails

// Route for the home page
router.get("/", (req, res) => {
    res.render("index"); // Render the index page
});

// Route for the secret page, protected by authentication
router.get("/secret", auth, (req, res) => {
    const message = req.message;
    const jwt = req.cookies.jwt;

    if (message == null || message == "") {
        // JWT is present, render secretPage
        return res.render("secretPage", { jwt });
    }

    // JWT is not present, render index page with the message
    res.render("index", { message });
});

// Route for user registration form
router.get("/registration", (req, res) => {
    res.render("registration"); // Render the registration form
});

// Route for processing user registration
router.post("/registration", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        const mobileRegex = /^[6-9]\d{9}$/;
         const email = req.body.email;
        let successMessage = "Registration successful. Please login.";

        if (password === confirmpassword) {
            if (!((() => {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(password);
            })())) {
                const errorMessage = "Password must be at least 8 characters long and contain at least one letter and one digit.";
                return res.render("registration", { errorMessage });
            }

            const registerEmp = new register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });

            if (!mobileRegex.test(req.body.phone)) {
                const errorMessage = "Invalid mobile number. Please enter a valid Indian mobile number.";
                return router.post("/registration", async (req, res) => {
                    try {
                        const password = req.body.password;
                        const confirmpassword = req.body.confirmpassword;
                        const mobileRegex = /^[6-9]\d{9}$/;
                
                        if (password === confirmpassword) {
                            if (!((() => {
                                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
                                return passwordRegex.test(password);
                            })())) {
                                const errorMessage = "Password must be at least 8 characters long and contain at least one letter and one digit.";
                                return res.render("registration", { errorMessage });
                            }
                
                            const registerEmp = new register({
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email: req.body.email,
                                gender: req.body.gender,
                                phone: req.body.phone,
                                age: req.body.age,
                                password: req.body.password,
                                confirmpassword: req.body.confirmpassword
                            });
                
                            if (!mobileRegex.test(req.body.phone)) {
                                const errorMessage = "Invalid mobile number. Please enter a valid Indian mobile number.";
                                return res.render("registration", { errorMessage });
                            }
                
                            const token = await registerEmp.generateAuthToken();
                
                            res.cookie("jwt", token, {
                                expires: new Date(Date.now() + 50000),
                                httpOnly: true
                            });
                
                            const temp = await registerEmp.save();
                            return res.status(201).render("login", { email, successMessage });
                        }
                    } catch (error) {
                        res.status(400).send(error);
                    }
                });;
            }

            const token = await registerEmp.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 50000),
                httpOnly: true
            });

            const temp = await registerEmp.save();
            return res.status(201).render("login", { email, successMessage });
        }
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key violation error (code 11000)
            const errorMessage = "This email is already registered";
            return res.render("registration", { errorMessage });
        } else {
            // Handle other errors
            res.status(400).send(error);
        }
    }
});

// Route for user login form
router.get("/login", (req, res) => {
    res.render("login"); // Render the login form
});

// Route for processing user login
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await register.findOne({ email: email });

        if (!user) {
            const errorMessage = "Invalid email or password";
            return res.render("login", { email, errorMessage });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = await user.generateAuthToken();
            res.cookie("jwt", token, {
                httpOnly: true
            });
            app.locals.jwt = token;
            res.render("secretPage", { jwt });
        } else {
            const errorMessage = "Invalid email or password";
            return res.render("login", { email, errorMessage });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for user logout
router.get("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token != req.token;
        });

        res.clearCookie("jwt");
        app.locals.jwt = '';
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for forgot password form
router.get("/forgotPassword", (req, res) => {
    res.render("forgotPassword"); // Render the forgot password form
});

router.post("/forgotPassword",async(req,res)=>{
    try {
        const email = req.body.email;
    const phone = req.body.phone;

    const user = await register.findOne({ email: email, phone: phone });
    
    if (!user) {
        const errorMessage = "Invalid email or phone";
        return res.render("forgotPassword", { errorMessage });
    }

    const newPassword = generateRandomPassword(); 
    console.log(`new pass : ${newPassword}`);
    user.password = newPassword;
    user.confirmpassword = newPassword;

    await user.save();

    try {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_ID,
                pass: process.env.APP_KEY,
            },
        });

        let details = {
            from: process.env.APP_ID,
            to: email,
            subject: `Use this password for signing up for: ${email}`,
            text: `Generated password: ${newPassword}`,
        };

        await mailTransporter.sendMail(details);
    } catch (error) {
        const errorMessage = "Failed to send the email.";
        return res.render("forgotPassword", { errorMessage });
    }
    const errorMessage = "New password has been sent to your email";
    res.render("forgotPassword",{ errorMessage });
    
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})



router.get("/resetPassword",(req,res)=>{
    console.log(app.locals.jwt);
    res.render("resetPassword", { jwt: app.locals.jwt });

})

router.post("/resetPassword", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password !== confirmPassword) {
            const errorMessage = "Passwords don't match";
            return res.render("resetPassword", { errorMessage });
        }

        const user = await register.findOne({ email: email });

        if (!user) {
            const errorMessage = "Invalid email";
            return res.render("resetPassword", { errorMessage });
        }

        user.password = password;
        user.confirmpassword = confirmPassword;
        console.log(req.cookies.jwt);
        await user.save();

        const errorMessage = "Password reset done";

        res.render("resetPassword", { errorMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
