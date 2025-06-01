const JWT=require("jsonwebtoken")
require("dotenv").config()
const secret=process.env.SECRET

const createUserToken=(user)=>{
    const payload={
        _id:user._id,
        email:user.email,
        profileImgURL:user.profileImgURL,
        role:user.role,
    }
    const token=JWT.sign(payload,secret)
    return token
}

const verifyUserToken=(token)=>{
    const payload=JWT.verify(token,secret)
    return payload
}

module.exports={
    createUserToken,
    verifyUserToken
}