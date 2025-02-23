import express from 'express';
import type { Request, Response } from 'express';
import { PurchasedItems, User } from '../../models/index.js';  // Import the PurchasedItems and User models
import { authenticateToken } from '../../middleware/auth.js';  // Import authentication middleware

const router = express.Router();

// GET /purchased-list - Get purchased list items for the logged-in user
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const username = req.user?.username;  // Get the user identifier (username) from the JWT payload

  try {
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Query the User model to get the userId based on the username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userId = user.id;  // Get the actual userId from the User model

    // Fetch purchased list items for this userId
    const purchasedList = await PurchasedItems.findAll({
      where: { userId },  // Ensure we only fetch the purchased list for the logged-in user
    });

    return res.json(purchasedList);  // Send back the list for the logged-in user
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /purchased-list/:id - Get a specific purchased list item by id for the logged-in user
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const username = req.user?.username;  // Get the user identifier (username) from the JWT payload

  try {
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Query the User model to get the userId based on the username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userId = user.id;  // Get the actual userId from the User model

    const purchasedItem = await PurchasedItems.findOne({
      where: { id, userId },  // Ensure we only fetch items that belong to the logged-in user
    });

    if (purchasedItem) {
      return res.json(purchasedItem);
    } else {
      return res.status(404).json({ message: 'Purchased item not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /purchased-list - Create a new purchased list item for the logged-in user
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const { category, name, quantity, price, store, date } = req.body;
  const username = req.user?.username;  // Get the user identifier (username) from the JWT payload

  try {
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Query the User model to get the userId based on the username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userId = user.id;  // Get the actual userId from the User model

    const newPurchasedItem = await PurchasedItems.create({
      userId,  // Attach the logged-in user's userId to the item
      category, 
      name, 
      quantity, 
      price, 
      store, 
      date,
    });

    return res.status(201).json(newPurchasedItem);  // Return the newly created item
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// PUT /purchased-list/:id - Update a purchased list item by id for the logged-in user
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, name, quantity, price, store, date } = req.body;
  const username = req.user?.username;  // Get the user identifier (username) from the JWT payload

  try {
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Query the User model to get the userId based on the username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userId = user.id;  // Get the actual userId from the User model

    const purchasedItem = await PurchasedItems.findOne({
      where: { id, userId },  // Ensure the item belongs to the logged-in user
    });

    if (purchasedItem) {
      purchasedItem.category = category;
      purchasedItem.name = name;
      purchasedItem.quantity = quantity;
      purchasedItem.price = price;
      purchasedItem.store = store;
      purchasedItem.date = date;
      await purchasedItem.save();
      return res.json(purchasedItem);
    } else {
      return res.status(404).json({ message: 'Purchased item not found' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// DELETE /purchased-list/:id - Delete a purchased list item by id for the logged-in user
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const username = req.user?.username;  // Get the user identifier (username) from the JWT payload

  try {
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Query the User model to get the userId based on the username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const userId = user.id;  // Get the actual userId from the User model

    const purchasedItem = await PurchasedItems.findOne({
      where: { id, userId },  // Ensure the item belongs to the logged-in user
    });

    if (purchasedItem) {
      await purchasedItem.destroy();
      return res.json({ message: 'Purchased item deleted' });
    } else {
      return res.status(404).json({ message: 'Purchased item not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as purchasedListRouter };
