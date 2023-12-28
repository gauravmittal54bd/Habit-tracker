const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/habbitDB';

mongoose.connect(mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database Connected !!!");
});
