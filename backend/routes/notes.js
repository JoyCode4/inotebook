const express = require("express");
const router = express.Router();
const fetchuser =require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body,validationResult } = require("express-validator");
// Route 1 - get all notes of loggedIn User using : GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{
        const notes= await Notes.find({user:req.user.id});
        return res.json({notes:notes});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 1 - Add a new note using : POST "/api/notes/addnote". Login required
router.post("/addnote",fetchuser,[
    body("title","Enter valid a title").isLength({min:3}),
    body("description","Enter valid a description").isLength({min:5}),
],async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()});
    }
    try{
        const {description,tag,title}=req.body;
        const note = new Notes({
            title,
            description,
            tag,
            user:req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;