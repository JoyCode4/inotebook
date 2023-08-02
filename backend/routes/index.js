const express=require("express");
const router=express.Router();

router.use("/auth",require("./auth"));
router.use("/notes",require("./notes.js"));
router.use("/user",require("./user.js"));

module.exports = router;