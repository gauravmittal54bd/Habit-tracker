const mongoose = require('mongoose');


//schema
const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    },
    completionStatus: {
        type: Boolean,
        default: false
    },
    date: {
        type: String, 
        default: () => {
            const currentDate = new Date();
            return currentDate.toISOString().split('T')[0]; 
        }
    },
    dates: [{
        date: String,
        complete: String,
        Status : {
            type : String,
            default : "Unmarked"
        }
    }],
    favorite: {
        type: Boolean,
        default: false
    }
});

//collection defined
const habit = new mongoose.model("User",habitSchema);

module.exports = habit;