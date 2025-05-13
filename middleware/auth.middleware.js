import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/users.model.js';
// someone make a request to the server
// check if the request has a token(authorize middle)
// if yes, verify the token
// if the token is valid, find the user in the database(next)
// if the user exists, attach the user to the request
// if the user does not exist, return an error
//     console.error('Error:', error);
//         await session.abortTransaction();
const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } 
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}
export default authorize;