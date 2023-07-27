const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "jayeshwadhonk@r";


// Route 1 - Create User or Sign Up : Create a User using : POST "/api/auth/createuser". No Login Required ,Doesn't require Auth
router.post("/createuser",[
    body("email","Enter a valid email").isEmail(),
    body("name","Enter a valid name").isLength({min:3}),
    body("password","Password must be atleast 5 characters").isLength({min:5}),
],async (req,res)=>{
    // console.log(req.body);
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        // Check whether the user with this email exists already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:" Sorry,a user with this email already exists..."})
        }
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        // Create a new user in User Schema
        user = await User.create({
            email:req.body.email,
            password:secPass,
            name:req.body.name
        })
        const data={
            user:{
                id:user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data,JWT_SECRET);
        console.log(authtoken);

        res.status(200).json({success,authtoken});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 - Login : Authenticate a User using: POST "/api/auth/login".No login required , Does required Authentication
router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password can't be blank").exists(),
],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({errors:"Please try to login with correct credentials"}); 
        }

        const data={
            user:{
                id:user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data,JWT_SECRET);
        return res.status(200).json({success,authtoken});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

})


// Route 3 - get Logged In User details : POST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser,async (req,res)=>{  
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json(user);
    }catch(err){
        console.log(err.msg);
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;