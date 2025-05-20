import {Router} from 'express';
import authorize  from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscriptions , getAllSubscriptions, getSubscriptionDetails, updateSubscription } from '../controllers/subscription.controller.js';
const subscriptionRouter = Router();

subscriptionRouter.get('/' , getAllSubscriptions);

subscriptionRouter.get('/:id' , getSubscriptionDetails);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id' , updateSubscription);

subscriptionRouter.delete('/:id' , (req, res) => res.send({title: 'delete  Subscriptions'}));

subscriptionRouter.post('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel' , (req, res) => res.send({title: 'Cancel Subscriptions'}));

subscriptionRouter.put('/:id/renew' , (req, res) => res.send({title: 'Renew Subscriptions'}));





export default subscriptionRouter;