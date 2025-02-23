import express from 'express';
import type { Request, Response } from 'express';
import { GroceryList, PurchasedItems, User } from '../../models/index.js';  // Import the PurchasedItems and User models
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

// POST /purchased-list/move-to-purchased/:id - Move item from grocery list to purchased list
router.post('/move-to-purchased/:id', authenticateToken, async (req: Request, res: Response) => {
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

    // Find the item in the grocery list
    const item = await GroceryList.findOne({ where: { id, userId } });

    if (!item) {
      return res.status(404).json({ message: 'Item not found in grocery list' });
    }

    // Move the item to the purchased list
    const purchasedItem = await PurchasedItems.create({
      userId,
      category: item.category,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      store: item.store,
      date: item.date,
    });

    // Remove the item from the grocery list
    await item.destroy();

    // Return the purchased item details
    return res.json(purchasedItem);

  } catch (error: any) {
    console.error('Error moving item:', error);
    return res.status(500).json({ message: error.message });
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
