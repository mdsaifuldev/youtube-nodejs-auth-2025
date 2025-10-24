
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");



// Register controller 
const registerUser = async(req, res)=>{
    try{
        // Extract user information from our request body
        const {username, email, password, role} = req.body;
        
        // check if user is already exits in our datatbase 
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User is already exists, please try with difference username and email"

            });
        };

        // hash user password 
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        
        // create a new user and save your database 
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedpassword,
            role: role || 'user'
        });

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message: "User register successfully",
            })
        }else{
              res.status(400).json({
                success: false,
                message: "User register not successful please try again",
            })
        }
         

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Invalid email or password",
        })
    }
}


// login controller 

const loginUser = async(req, res)=>{
    try{
        const {username, password} = req.body;

        // find if the current user is exist in database or not
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({
                success: false,
                message: "Invalid username or password"
            })
        };

        // if the password is correct or not 
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
             res.status(400).json({
                success: false,
                message: "Invalid username or password"
            })

        };

        // create user token

        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30m"
        });

        res.status(200).json({
            success: true,
            message: "Login is successful",
            accessToken
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again",
        })
    }
};



module.exports = {registerUser, loginUser };