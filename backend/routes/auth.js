const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    obj={
        name:"auth.js"
    }
    res.json(obj);
})

module.exports = router;