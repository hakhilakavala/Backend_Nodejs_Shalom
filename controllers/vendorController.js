//importing vendor file from models
const Vendor = require('../models/Vendor');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretkey =process.env.whatIsYourName
//registering the vendor for that a asychronous func with 2 parameters
//after checking the email and passwords given by vendor and other emails if they are not matched we convert it to token and save in database for passwords(hashedpassword) for that  we installed jsonwebtoken for mails and for passwors bcryptjs
//when using async func await keyword is compulsory
const vendorRegister = async(req,res)=>{
        const{username, email,password}=req.body;
    try{
        const vendorEmail =await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();

        res.status(201).json({message:"Vendor registered successfully"});
        console.log('registered')



    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});

    }

}
// after vendor registration now vendor login
//in vendor login we are creating a token jwt token
const vendorLogin = async(req,res)=>{
        const{email,password} = req.body;
try{
        const vendor = await Vendor.findOne({email});
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
        return res.status(401).json({error:"Invalid username or password"})
    }
    const token= jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"})

    res.status(200).json({sucess: "Login successful",token})
    console.log(email,"this is token",token);
}catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"});

}

}

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});

    }
}

const getVendorById = async(req,res)=>{
        const vendorId= req.params.id;
        try{
            const vendor= await Vendor.findById(vendorId).populate('firm');
            if(!vendor){
                return res.start(404).json({error: "Vendor not found"})
            }
            res.start(200).json({vendor})
        }catch(error){
            console.log(error);
            res.status(500).json({error:"Internal server error"});

        }
}

module.exports ={vendorRegister,vendorLogin,getAllVendors,getVendorById }