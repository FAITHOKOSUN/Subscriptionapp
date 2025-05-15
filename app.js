import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './config/Database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cookieParser());

app.use(arcjetMiddleware); // Arcjet middleware for security and rate limiting

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to subscription tracker API');
});

app.listen(PORT, async () => {
    console.log(`Subscription tracker is running on http://localhost:${PORT}`);
    await connectDB();
});

export default app;