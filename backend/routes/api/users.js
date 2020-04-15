const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../../validation/register");
const validateLogInInput = require("../../validation/login");

const User = require("../../models/User");

router.post("/register",(req,res)=>{

    //Form validation
    const { errors,isValid } = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email:req.body.email }).then(returnedStuff => {
        if(returnedStuff) {
            return res.status(400).json({email:"email already exists"})
        }
        else {
        //saving user with request information to database
            const newUser = new User({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
            })

            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password =hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            });
        }
        
    });
    
    

    

})

router.post("/login",(req,res)=> {
    //Form validation

    const{ errors,isValid } = validateLogInInput(req.body);

    //Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password =req.body.password;

    //Find user by email
    User.findOne({email}).then(user => {
        //Check if user exists
        if(!user){
            return res.status(404).json({ emailnotfound:"Email not found" });
        }
        //Check password
        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch) {
                //user matched
                //Create JWT payload
                const payload = {
                    id:user.id,
                    name:user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds

                    },
                    (err,token) => {
                        res.json({
                            success:true,
                            token:"Bearer" + token
                        });
                    }
                );
            }
            else {
                return res
                .status(400)
                .json({passwordincorrect: "password incorrect"});
            }
        })
    })
})

module.exports = router;