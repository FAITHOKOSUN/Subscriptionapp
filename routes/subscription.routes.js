import {Router} from 'express';
const subscriptionRouter = Router();

subscriptionRouter.get('/' , (req, res) => res.send({title: 'get all Subscriptions'}));

subscriptionRouter.get('/:id' , (req, res) => res.send({title: 'get Subscription details'}));

subscriptionRouter.post('/' , (req, res) => res.send({title: 'create  Subscriptions'}));

subscriptionRouter.put('/:id' , (req, res) => res.send({title: 'update  Subscriptions'}));

subscriptionRouter.delete('/:id' , (req, res) => res.send({title: 'delete  Subscriptions'}));

subscriptionRouter.post('/user/:id' , (req, res) => res.send({title: 'get all user Subscriptions'}));

subscriptionRouter.put('/:id/cancel' , (req, res) => res.send({title: 'Cancel Subscriptions'}));

subscriptionRouter.put('/:id/renew' , (req, res) => res.send({title: 'Renew Subscriptions'}));





export default subscriptionRouter;