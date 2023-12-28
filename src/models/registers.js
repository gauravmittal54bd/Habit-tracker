require('dotenv').config();
const mongoose = require('mongoose');
const bycrupt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type : String
    },
    phone : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});

//Middleware
Schema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString(),
                                firstName: this.firstName,
                                lastName: this.lastName},
                                process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

Schema.pre("save",async function(next){
    if(this.isModified("password")){
        const passwordHash = await bycrupt.hash(this.password,10);
        this.password = passwordHash;
        this.confirmpassword = await bycrupt.hash(this.password,10);
    }
    next();
})

const register  = new mongoose.model("Register",Schema);

module.exports = register;