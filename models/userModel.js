const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema)