const express = require('express');
//const mongodb = require('mongodb')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes')
const app = express();
app.use(cors({
    credentials:true,
    origin:['mean-auth-jwtauth.vercel.app']
}))
app.use(cookieParser())
app.use(express.json())


app.use('/api', routes);

app.get('/home', (req,res)=>{
    res.send('hello')
})

mongoose.connect("mongodb+srv://rinkal263:3zRmzYyv26g7j3hb@cluster0.pbng0du.mongodb.net/jwt?retryWrites=true&w=majority&appName=Cluster0",{
})
 

.then(()=>{
    console.log("connected to database");
    const port =5000;
    app.listen(port, () => {
        console.log("your website is served on http://localhost:5000");
    });
         
})