const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoute = require('./api/routs/student')
const facaltyRoute =require('./api/routs/facalty');
const userRoute = require('./api/routs/user');
const fileUpload = require('express-fileupload');


app.set('view engine','ejs');

mongoose.connect('mongodb+srv://mdaarifraza:ar123@aarif.h7xcebg.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log("connection failed");
});

mongoose.connection.on('connected',connected=>{
    console.log("connected with database...");
});
app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/facalty',facaltyRoute);
app.use('/user',userRoute);



app.use((req,res,next)=>{
    res.status(404).json({
        error:"bad request"
    })
})



module.exports = app;