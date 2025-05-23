import User from '../models/users.model.js';

export const getUsers = async (req, res, next) => {  
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            message: 'Users fetched successfully',
            users,
        }); 
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {  
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        } 
        
        res.status(200).json({
            message: 'User fetched successfully',
            user,
        }); 
    } catch (error) {
        next(error);
    }
};