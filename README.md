# Habit-tracker-app
Hosted url : https://weekly-habit-tracking-app-production.up.railway.app

## Table of Contents
   - [UI Screenshots](#ui-screenshots)
   - [Features](#features)
   - [Getting Started](#getting-started)
   - [Folder Structure](#folder-structure)
   - [Technologies Used](#technologies-used)


## UI Screenshots
<div class="image-grid">
    <img src="https://github.com/gauravmittal54/Weekly-habit-tracking-app/assets/61792468/afc09265-51fa-4142-aec9-518b60b7aa6e" alt="Image 1">
    <img src="https://github.com/gauravmittal54/Weekly-habit-tracking-app/assets/61792468/06948940-c371-4f90-8d80-bf4c49eda445" alt="Image 2">
    <img src="https://github.com/gauravmittal54/Weekly-habit-tracking-app/assets/61792468/ae02e3d0-5934-4ba7-a76b-5c6fd732b48d" alt="Image 3">
    <img src="https://github.com/gauravmittal54/Weekly-habit-tracking-app/assets/61792468/d59a7e53-4ba1-4a50-b0c4-78557f0908a6" alt="Image 4">
    <img src="https://github.com/gauravmittal54/Weekly-habit-tracking-app/assets/61792468/d3964a13-d871-437a-96e3-546e52a1538c" alt="Image 5">
</div>







## Features
1. User-Friendly Interface: The application offers an intuitive and user-friendly interface for managing daily habits for each user logged in.

2. Habit Management: Users can add new habits, update existing ones, and delete habits they no longer want to track.

3. Favorite Habits: Marking habits as favorites allows users to prioritize and easily identify important habits.

4. Progress Tracking: The application dynamically updates the completion status of each habit and provides visual feedback.

5. Authentication System: Each user has to authenticate before acessing the main page.


## Getting Started
- Clone the Repository: Clone this repository to your local machine using the following command:

<pre>git clone https://github.com/gauravmittal54/habit-tracker-app.git</pre>
- Install Dependencies: Navigate to the project directory and install the required dependencies using npm:

<pre>npm install</pre>
- Set Up MongoDB: Ensure you have MongoDB installed and running on your local machine. You may need to configure the database connection in the db_connection.js file.

- Add these keys in .env file : <pre>SECRET_KEY="YOUR-SECRET-JWT-KEY"
                              APP_KEY = "NODEMAILER-APP-KEY"
                              APP_ID - "NODEMAILER-APP-ID"</pre>

- Start the Application: Launch the Habit Tracker application by running:

<pre>npm start</pre>
- Access the Application: Open your web browser and access the application at http://localhost:8000.


## Folder Structure

<pre>

Weekly-habit-tracking-app/
|-- public/
|   |-- css/
|   |   |-- auth-styles/
|   |   |   |-- registration-styles.css
|   |   |   |-- style.css
|   |   |-- user-styles/
|   |   |   |-- main-style.css
|   |   |   |-- style.css
|   |   |   |-- view-styles.css
|   |-- js/
|   |   |-- auth-js/
|   |   |   |-- login-script.js
|   |   |-- user-js/
|   |   |   |-- script.js
|   |   |   |-- view-script.js
src/
|-- controllers/
|   |-- formatDate.js
|   |-- getDayofWeek.js
|   |-- randompass.js
|-- db/
|   |-- conn.js
|-- middleware/
|   |-- auth.js
|   |-- user-auth.js
|-- models/
|   |-- habitSchema.js
|   |-- registers.js
|-- routers/
|   |-- auth-routes.js
|   |-- user-routes.js
src/
|-- app.js
templates/
|-- partials/
|   |-- footer.hbs
|   |-- icon.hbs
|   |-- messagebox.hbs
|   |-- navbar.hbs
|   views/
|   |-- 404ErrorPage.hbs
|   |-- addHabitPage.hbs
|   |-- forgotPassword.hbs
|   |-- habitIndex.hbs
|   |-- index.hbs
|   |-- login.hbs
|   |-- registration.hbs
|   |-- resetPassword.hbs
|   |-- secretPage.hbs
|   |-- viewAllHabits.hbs
README.md
package-lock.json
package.json

  
</pre>


### Technologies Used
 - Node.js
 - Express.js
 - MongoDB
 - Mongoose





