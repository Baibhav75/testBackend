const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* SIGNUP */

router.post("/signup", async (req,res)=>{

try{

const {name,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({
    name,
    email,
    password:hashedPassword
});

await user.save();

res.json("User Registered");

}catch(err){

res.status(500).json(err);

}

});

/* SIGNIN */

router.post("/signin", async (req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json("User not found");
}

const validPass = await bcrypt.compare(password,user.password);

if(!validPass){
return res.status(400).json("Wrong Password");
}

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.json({token,user});

}catch(err){

res.status(500).json(err);

}

});

module.exports = router;