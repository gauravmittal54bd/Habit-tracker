const express = require('express');
const router = new express.Router();
const app = express();

const habit = require('../models/habitSchema');
const getDayOfWeek = require('../controllers/getDayofWeek');
const userAuth = require('../middleware/user-auth')




router.get('/habitIndex',userAuth, (req, res) => {
    res.render('habitIndex',{ firstname: res.locals.user.firstname ,  lastname: res.locals.user.lastname});
});


router.get('/addHabit', (req, res) => {
    
    res.render('addHabitPage');
});

router.get('/viewAll',userAuth, async (req, res) => {
    try {
        const habits = await habit.find({user : res.locals.user._id});
        res.render('viewAllHabits', { habits });
    } catch (err) {
        console.error("Error fetching habits:", err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/deleteHabit/:habitId', async (req, res) => {
    try {
        const habitId = req.params.habitId;
        await habit.findByIdAndDelete(habitId);
        res.sendStatus(204); // Successfully deleted
    } catch (err) {
        console.error("Error deleting habit:", err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/todaysHabits',userAuth, async (req, res) => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Get the current date in the same format as stored

    try {
        const habits = await habit.find({
            date: todayDate,
            user : res.locals.user._id
            }
        );
        console.log(`today date : ${todayDate} and habits }`)
        res.render('viewAllHabits', { habits });
    } catch (err) {
        console.error("Error fetching habits:", err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/favorite',userAuth, async (req, res) => {
    try {
        const habits = await habit.find({ favorite: true ,user : res.locals.user._id});
        console.log(habits)
        res.render('viewAllHabits', { habits });
    } catch (error) {
        console.error('Error fetching favorite habits:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addHabit',userAuth, async (req, res) => {
    try {
        const say = req.body.title;

        // Get the current date and its day of the week
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().split('T')[0];
        const currentDay = getDayOfWeek(currentDate);

        // Create an array to store the dates and days
        const dates = [];

        // Add the current date and day
        dates.push({ date: currentDate, complete: currentDay });

        // Add 6 more dates with incremental days
        for (let i = 1; i <= 6; i++) {
            const nextDate = new Date(currentDateTime);
            nextDate.setDate(currentDateTime.getDate() + i);
            const nextDateString = nextDate.toISOString().split('T')[0];
            const nextDay = getDayOfWeek(nextDateString);
            dates.push({ date: nextDateString, complete: nextDay });
        }

        const newActivity = new habit({
            name: say,
            user: res.locals.user._id,
            completeionStatus: false,
            date: currentDate, // Store the current date
            dates: dates // Store all 7 dates and days
        });

        await newActivity.save();
        console.log("New habit added:", newActivity);
        
    } catch (err) {
        console.error("Error adding habit:", err);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/updateHabitStatus/:habitId', async (req, res) => {
    try {
        const habitId = req.params.habitId;
        const { status } = req.body;
        

        // Check if the habit exists with the given habitId and the date's _id
        const habitExists = await habit.findOneAndUpdate(
            { 
                'dates._id': habitId
            },
            { 
                $set: {
                    'dates.$.Status': status
                }
            },
            { new: true }
        );

        if (!habitExists) {
            return res.status(404).send('Habit not found'); // Handle the case where habit is not found
        }

        res.sendStatus(204); // Successfully updated
    } catch (err) {
        console.error('Error updating habit status:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.patch('/updateFavorite/:habitId', async (req, res) => {
    try {
      const { habitId } = req.params;
      const { favorite } = req.body;
      
      // Update the favorite status in the database
      const updatedHabit = await habit.findByIdAndUpdate(
        habitId,
        { favorite },
        { new: true } // To get the updated habit object
      );
  
      res.status(200).json(updatedHabit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update favorite status' });
    }
  });


router.get('*', (req, res) => {
    res.render('404ErrorPage');
});



module.exports = router;