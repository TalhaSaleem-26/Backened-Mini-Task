const mongoose =require(`mongoose`);
const { type } = require("os");
mongoose.connect("mongodb://localhost:27017/TAlha");

let userschema=mongoose.Schema({
    Name:String,
    email:String,
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("user",userschema);

