const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    name :  {
        type : String,
        required: true,
        max : 256,
        min: 1
    },
    pwd : {
        type : String,
        required: true,
        max: 1024,
        min: 2,
    },
    email : {
        type: String ,
        max:256,
        min: 2 
    },
    date : {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);