
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//generate token

const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// @desc Register new user

exports.registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

// @desc login user

exports.loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};