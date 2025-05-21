//for creating a schema we need to import mongoose
const mongoose=require('mongoose');
//username property we gave type 
const vendorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
});
//we need to export this vendor model to use this further
 const Vendor=mongoose.model('Vendor',vendorSchema);
 module.exports=Vendor;