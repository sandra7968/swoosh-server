require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/router')
require('./connection')
const app = express()
const socket = require("socket.io")
app.use(cors())
app.use(express.json())
app.use(router)
 const PORT = 4000 || process.env.PORT

 const server = app.listen(PORT,()=>{
    console.log('Swoosh started at port:',PORT);
 })

 const io = socket(server,{
   cors:{
      origin:"http://localhost:3000",
      credentials: true
   }
 })

 global.onlineUsers = new Map()
 io.on('connection', (socket)=>{
   global.chatSocket = socket
   socket.on("add-user",(userId)=>{
      onlineUsers.set(userId,socket.id)
   })

   socket.on("send-msg",(data)=>{
      const sendUserSocket = onlineUsers.get(data.to)
      if(sendUserSocket){
         socket.to(sendUserSocket).emit("msg-recieve",data.message)
      }
   })
 })