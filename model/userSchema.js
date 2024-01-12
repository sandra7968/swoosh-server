const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[4, 'Must be at least 4, got {VALUE}'],
        max:15,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min: 6,
        
    },
    isProfilePicSet: {
        type: Boolean,
        default: false
    },
    profilePic:{
        type:String,
        default: ""
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users