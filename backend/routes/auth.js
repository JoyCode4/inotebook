const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");


// Create a User using : POST "/api/auth/createuser". No Login Required ,Doesn't require Auth
router.post("/createuser",[
    body("email","Enter a valid email").isEmail(),
    body("name","Enter a valid name").isLength({min:3}),
    body("password","Password must be atleast 5 characters").isLength({min:5}),
],async (req,res)=>{
    // console.log(req.body);
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
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
        res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;