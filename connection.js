const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb Atlas successfully connected to Swoosh!");
}).catch((err)=>{
    console.log(`Mongodb connection failed! Error: ${err}`);
})