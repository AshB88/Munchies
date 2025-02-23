import express from 'express';
import type { Request, Response } from 'express';
import { GroceryList, User } from '../../models/index.js'; // Import the User model
import { authenticateToken } from '../../middleware/auth.js';  // Import authentication middleware

const router = express.Router();

// GET /grocery-list - Get grocery list items for the logged-in user
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

    // Fetch grocery list items for this userId
    const groceryList = await GroceryList.findAll({
      where: { userId },  // Ensure we only fetch the grocery list for the logged-in user
    });

    return res.json(groceryList);  // Send back the list for the logged-in user
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /grocery-list/:id - Get a specific grocery list item by id for the logged-in user
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

    const groceryItem = await GroceryList.findOne({
      where: { id, userId },  // Ensure we only fetch items that belong to the logged-in user
    });

    if (groceryItem) {
      return res.json(groceryItem);
    } else {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /grocery-list - Create a new grocery list item for the logged-in user
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

    const newGroceryItem = await GroceryList.create({
      userId,  // Attach the logged-in user's userId to the item
      category, 
      name, 
      quantity, 
      price, 
      store, 
      date,
    });

    return res.status(201).json(newGroceryItem);  // Return the newly created item
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// PUT /grocery-list/:id - Update a grocery list item by id for the logged-in user
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

    const groceryItem = await GroceryList.findOne({
      where: { id, userId },  // Ensure the item belongs to the logged-in user
    });

    if (groceryItem) {
      groceryItem.category = category;
      groceryItem.name = name;
      groceryItem.quantity = quantity;
      groceryItem.price = price;
      groceryItem.store = store;
      groceryItem.date = date;
      await groceryItem.save();
      return res.json(groceryItem);
    } else {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// DELETE /grocery-list/:id - Delete a grocery list item by id for the logged-in user
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

    const groceryItem = await GroceryList.findOne({
      where: { id, userId },  // Ensure the item belongs to the logged-in user
    });

    if (groceryItem) {
      await groceryItem.destroy();
      return res.json({ message: 'Grocery item deleted' });
    } else {
      return res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as groceryListRouter };
