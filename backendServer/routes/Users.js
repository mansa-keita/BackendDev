const express = require('express')
const {Users} = require("../models")
const bcrypt = require("bcrypt")
const router = express.Router()



router.post("/", async(req, res)=>{
    const {userName, password} = req.body
     bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            userName: userName,
            password: hash
        })
        res.json("SUCCESS")
     })
  
    
})


router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName } });
  
    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.json({ error: "Wrong Username or Password Combination" });
      }
  
      res.json("YOU LOGGED IN!!!");
    });
  });
  






module.exports = router