// Import required modules and configure environment variables
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('./db/conn'); // Database connection configuration
const authRouter = require('./routers/auth-routes'); // User router module
const userRouter = require("./routers/user-routes");
const hbs = require("hbs");
const Handlebars = require('handlebars');
const formatDate = require('./controllers/formatDate');
const app = express();

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public"); // Directory for static files (CSS, JS)
const template_path = path.join(__dirname, "../templates/views"); // Directory for views (HBS templates)
const partials_path = path.join(__dirname, "../templates/partials"); // Directory for partials (HBS partial templates)


app.locals.jwt = ''; // Store JWT (JSON Web Token) in a local variable

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

app.use(express.static(static_path)); // Serve static files (CSS, JS)
app.set("view engine", "hbs"); // Set view engine to Handlebars (HBS)
app.set("views", template_path); // Set views directory
hbs.registerPartials(partials_path); // Register partial templates for HBS
hbs.registerHelper('customFunction', function (date) {
    const formattedDate = formatDate(date); 
    return new Handlebars.SafeString(formattedDate); 
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter); // Use user router for handling user-related routes
app.use(userRouter);




// Start the server
app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});
