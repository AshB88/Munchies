import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { groceryListRouter } from './grocery-list-routes.js';  // Import grocery list routes
import { purchasedListRouter } from './purchased-list-routes.js';  // Import purchased list routes

const router = Router();

router.use('/users', userRouter);  // Route for users
router.use('/grocery-list', groceryListRouter);  // Route for grocery list items
router.use('/purchased-list', purchasedListRouter);  // Route for purchased items

export default router;
