const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {

        const { name, email, password } = req.body;

        if(!email || !password) {
            res.status(400);
            throw new Error("Please provide email and password");
        }

        const userExists = await User.findOne({ email });

        if(userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const comparePassword = await bcrypt.compare(password, user.password);

    if(user && comparePassword) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error ('Invalid Credentials');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error('User not found');
    };

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword }, { new: true });
    };

    delete req.body.password;
    
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });

    res.status(200).json('User updated');
});


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    updateUser
}