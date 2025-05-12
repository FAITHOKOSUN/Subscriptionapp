import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

export const signUp = async (req, res, next) => {
    console.log('Request Body:', req.body);
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Extract user details from request body
        const { name, email, password } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            console.error('Missing fields:', { name, email, password });
            const error = new Error('All fields (name, email, password) are required');
            error.statusCode = 400;
            throw error;
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Debugging log
        console.log('Creating user with:', { name, email, password: hashedPassword });
        
        // Create new user - fix: use array with session for create
        const newUser = await User.create([
            { name, email, password: hashedPassword }
        ], { session });
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser[0]._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        await session.commitTransaction();
        session.endSession();
        
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser[0]._id,
                name: newUser[0].name,
                email: newUser[0].email,
            },
            token,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error during sign up:', error);
        next(error); // Pass the error to the error-handling middleware
    }
};

export const signIn = async (req, res, next) => {
   try {
    const {email, password} = req.body;
    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    // Check password
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({
        success: true,
        message: 'User signed in successfully',
        data: {
            token,
            user,
        }
       
    });
    } catch (error) {
     next(error);
   }
}

export const signOut = async (req, res) => {
    //implement signout logic here

};