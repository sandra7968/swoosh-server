const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const messageController = require("../controllers/messageController")
// register
router.post('/user/register',userController.register)
// login
router.post('/user/login',userController.login)
// profile image
router.post('/user/profilePic/:id',userController.profilePicSet)
router.get("/user/allUsers/:id",userController.getAllUsers)

// messages
router.post("/addmsg/", messageController.addMessage)
router.post("/getmsgs/",messageController.getAllMessages)
module.exports = router