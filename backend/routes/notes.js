const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    obj={
        name:"notes.js"
    }
    res.json(obj);
})

module.exports = router;