const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const {authenticateToken} = require('./userAuth');
// Sign Up
router.post("/sign-up",async(req,res)=>{
        try{
            const {username,email,password,address} = req.body;

            // check length of username
            if(username.length < 4){
               return res.status(400).json({message: "username should be greater than 4"});
            }

            // check if username already exists 
            const existingUsername = await User.findOne({username:username});
            if(existingUsername){
                return res.status(400).json({message:"username already exists in database"});
            }

            // check if email already exists
            const existingEmail = await User.findOne({email:email});
            if(existingEmail){
                return res.status(400).json({message:"email already exists in database"});
            }

            // check password length 
            if(password.length <= 5)
            {
                return res.status(400).json({message:"password should be greater than or equal to 5"});
            }

            const hashedPassword = await bcrypt.hash(password,saltRounds);
            
            const newUser = new User({
                username:username,
                password:hashedPassword,
                email:email,
                address:address
            });

            await newUser.save();

            return res.status(200).json({message:"Sign-up successfull"});

        }
        catch(err){
            res.status(500).json({message: "Internal server error"});
        }
});

//Sign In
router.post('/sign-in',async(req,res)=>{
    try{
        const {username,password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser)
        {
            res.status(400).json({message:"Invalid Credentials"});
        }
        await bcrypt.compare(password, existingUser.password, (err,data)=> {
            if(data){
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role},
                ]
                const token  = jwt.sign({authClaims}, "bookstore123",{
                    expiresIn: "30d"
                });
                res.status(200).json({id:existingUser._id,role:existingUser.role,token:token});
            }else{
                res.status(400).json({message:"Invalid Credentials"});
            }
        })
    }
    catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

// get-user-information

router.get("/get-user-information", authenticateToken , async(req,res) =>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
})

// update address

router.put("/update-address",authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address:address});
        return res.status(200).json({message: "Address updated successfully"});
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
})
module.exports = router;