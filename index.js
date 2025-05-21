//we are taking a variable express and importing the express we installed
const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes =require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');
//taking another variable and giving the express methods to it
const app=express()

const PORT= 4000;
dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected successfully!"))
    .catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

//we are creating a server for that method we are giving two parameters port,callback function to give output and also we take ``to pass dyanamic value in that variable
app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});
//now we are creating a router home and a call back function request,response
app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to shalom");
})
