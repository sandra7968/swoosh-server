const users = require("../model/userSchema");
const bcrypt = require('bcrypt')
// register
exports.register = async(req,res)=>{
    console.log('Register controller function',req.body);
    const {username,email,password} = req.body
    try{const existingUser = await users.findOne({username,email})
    if(existingUser){
        res.status(406).json("User already exists. Please Login!")
    }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await users.create({
            email,username,password:hashedPassword
        })
        delete newUser.password
        res.status(200).json(newUser)
        
    }

}catch(err){
    res.status(401).json(`Register API Failed, Error:${err}`)
}
}

// login
exports.login = async(req,res)=>{
    console.log('Login function');
    const {username,password} = req.body
    try{
        const existingUser = await users.findOne({username})
        if(!existingUser){
            res.status(406).json("Invalid username or password")
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordValid){
            return res.status(406).json("Invalid username or password")
        }
        delete existingUser.password
        res.status(200).json(existingUser)
    }catch(err){
        res.status(401).json(`Login API Failed, Error:${err}`)
    }
}

// profilepic
exports.profilePicSet = async(req,res)=>{
    try{
        const userId = req.params.id
        const profilePic= req.body.image
        const userData = await users.findByIdAndUpdate(userId,{
            isProfilePicSet:true,
            profilePic,
        })
        res.status(200).json({
            isSet: userData.isProfilePicSet,
            image: userData.profilePic
        })
    }catch(err){
        res.status(401).json(`Profile API Failed, Error:${err}`)
    }
}

exports.getAllUsers = async(req,res)=>{
    try{
        const user =  await users.find({_id: {$ne: req.params.id}}).select([
            "email","username","profilePic","_id"
        ])
        res.status(200).json(user)
    }catch(err){
        res.status(401).json(`getAllUsers API Failed, Error:${err}`)
    }
}