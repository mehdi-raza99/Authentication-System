const { User } = require("../models/user");
const bcrypt=require('bcryptjs');
const { generateTokenAndSetCookie } = require("../utils/generateTokenAndSetCookie");
const { sendEmail } = require("../mailtrap/mailtrap");
const signup=async (req,res) => {
    const {email,password,name}=req.body;
    try {
        const userAlreadyExist=await User.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({
                success: false,
                message: "Already Exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const verificationToken=Math.floor(10000+Math.random()*90000).toString();
        const user=new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+24*60*60*10000
        })
        await user.save();
        sendEmail("Verify Your account",`Your verification code is ${verificationToken}`)
        generateTokenAndSetCookie(res,user._id);
        res.status(201).json({
            success: true,
            message: "User Created Successfully. Verify your email!",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const verifyEmail=async (req,res) => {
    const {code}=req.body;
    const user=await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: {$gt: Date.now()}
    })
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid or expired verificationToken!"
        })
    }
    
    user.verificationToken=undefined
    user.verificationTokenExpiresAt=undefined
    user.isVerified=true
    await user.save()
    sendEmail("Account verified successfully","Welcome and enjoy the services available!")
    res.status(200).json({
        success: true,
        message: "Email verified successfully"
    })
}
const login=async (req,res) => {
    
    const {email, password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }
            
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            
            return res.status(400).json({
                success: false,
                message: "Invalid Password!"
            })
        }            
            generateTokenAndSetCookie(res,user._id);
            user.lastLogin=Date.now();
            await user.save()
            return res.status(200).json({
                success: true,
                message: "Logged in Successfully!",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
    } catch (error) {
        console.log("Error: ", error.message)
    }
}
const logout=(req,res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logout Successfully!"
    })
}
const checkAuth=async(req,res) => {
    try {
        const user=await User.findById(req.userId).select("-password")
        if(!user)
            return res.status(400).json({
                success: false,
                message: "No user found"
            })
        res.status(200).json({
                success: true,
                user
        })
    } catch (error) {
        console.log(error.message);        
    }
}
module.exports={signup,login,logout,verifyEmail,checkAuth}