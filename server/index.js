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

app.get('/', (req,res)=>{
    res.send('hello');
})

mongoose.connect("mongodb://localhost:27017/jwt",{
   // userNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database");
    const port =5000;
    app.listen(port, () => {
        console.log("your website is served on http://localhost:3000");
    });
         
})