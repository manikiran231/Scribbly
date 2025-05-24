const {Router}=require("express")
const User=require("../models/user")
const router=Router();

router.get("/signin", (req,res)=>{
    return res.render("signin")
})

router.get("/signup", (req,res)=>{
    return res.render("signup")
})

router.post('/signup',async(req,res)=>{
    const {fullname,email,password}=req.body;
    await User.create({
        fullname,
        email,
        password
    })
    return res.redirect("/user/signin")
})

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token =await User.matchPasswordAndGenerateToken(email,password)
    return res.cookie("token",token).redirect("/")
    }
    catch(error){
        return res.render("signin",{
            error:"Incorrect email or password"
        })  
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/")
})

router.get("/dashboard/:id",(req,res)=>{
    res.render("dashboard",{
        user:req.user,
        userId:req.params.id
    })
})

module.exports=router;
