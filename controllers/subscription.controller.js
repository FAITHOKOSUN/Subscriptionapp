import Subscription from '../models/subscription.model.js';


export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({...req.body,
            user: req.user._id,
          
        });
        res.status(201).json({
            status: "success",
            data: {
                subscription,
            },
        });

    }catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ error: "Internal server error" });
    next(error);
    }
}
 

export const getUserSubscriptions = async (req, res) => {
    try {
        // Check if the user is authorized to access this resource
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: "you are not the owner" });
        }
        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({
            status: "success",
            data: {
                subscriptions,
            },
        });
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            status: "success",
            data: {
                subscriptions,
            },
        });
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getSubscriptionDetails = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                subscription,
            },
        });
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export  const updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                subscription,
            },
        });
    } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
