const express = require("express");
const router = express.Router();
const fetchuser =require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body,validationResult } = require("express-validator");
// Route 1 : get all notes of loggedIn User using : GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{
        const notes= await Notes.find({user:req.user.id});
        return res.json({notes:notes});
    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
})

// Route 2 : Add a new note using : POST "/api/notes/addnote". Login required
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
        return res.json(savedNote);
    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Update an existing note using : PUT "/api/notes/update/:id". Login required
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const {tag,description,title}=req.body;
    const newNote = {};
    try{
        if(title){
            newNote.title=title;
        }
        if(tag){
            newNote.tag=tag;
        }
        if(description){
            newNote.description=description;
        }
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(401).send("Note Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        return res.json({note});
    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
})

// Route 4 : Delete an existing note using : DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    try{
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        
        if(!note){
            return res.status(401).send("Note Not Found");
        }
        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({"Success":"Note is deleted successfully"});
    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }

})

module.exports = router;