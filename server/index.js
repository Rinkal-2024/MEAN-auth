const express = require('express');
//const mongodb = require('mongodb')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes')
const app = express();
app.use(cors({
    credentials:true,
    origin:['https://mean-auth-jwt.vercel.app']
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api', routes)

mongoose.connect("mongodb://localhost:27017/jwt",{
   // userNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database");
    app.listen(5000 ,()=>{
        console.log("App is listening on port 5000");
    })
})