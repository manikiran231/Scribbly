const {createHmac,randomBytes }=require("crypto")
const {Schema,model}=require('mongoose');
const { createUserToken } = require("../services/auth");

const userSchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImgURL:{
        type:String,
        default:'./images/image.jpg',
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{timestamps:true})

userSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")) return next();
    const salt =randomBytes(16).toString();
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashedPassword;

    next()
})

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user=await this.findOne({email})
    if(!user) throw new Error("Invalid User")
    const salt =user.salt;
    const hashedPassword=user.password;
    const verfPassword=createHmac("sha256",salt).update(password).digest("hex")
    if(hashedPassword!==verfPassword) throw new Error("Incorrect password")
    const token=createUserToken(user)
    return token
})

const User=model("user",userSchema);

module.exports=User;