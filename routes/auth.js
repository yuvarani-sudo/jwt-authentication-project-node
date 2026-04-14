const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/authMiddleware");

// we split the routes into different files for better organization and readability.
const router = express.Router();
const users = [];

router.get("/", (req, res) => {
    res.json({message: "Welcome to the auth API"});
});

router.post("/register",async(req, res) => {
   const { username, password } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);

   users.push({username, password: hashedPassword});

   res.status(201).json({message: "User registered successfully"});

});


router.post("/login", async(req, res) => {

    const { username, password } = req.body;
    const user = users.find(u => u.username == username);
    if(!user){
      return res.status(400).json({message: "Unable find the user"});
    }
    
    const inValidPwd = await bcrypt.compare(password,user.password);
    if(!inValidPwd){
        return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({username: username}, process.env.SECRET_KEY,    { expiresIn: "1h"});
    res.json({token});
});


router.get("/profile", authMiddleware, (req, res) => {
    res.json({message: `Welcome ${req.user.username}! This is your profile.`});
});

module.exports = router;

