const messageSchema = require("../model/messageSchema")

exports.addMessage = async (req,res)=>{
    try{
        const {from,to,message} = req.body
        const data = await messageSchema.create({
            message:{text:message},
            users: [from, to],
            sender: from
        })
        if(data) return res.json({msg: "Message added successfully!"})
        return res.json({msg: "Failed to add message to the database!"})
    }catch(err){
        res.json(err)
    }
}
exports.getAllMessages = async (req,res)=>{
    try{
        const {from, to} = req.body
        const messages = await messageSchema.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt:1})
        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectMessages)
    }catch(err){
        res.json(err)
    }
}

