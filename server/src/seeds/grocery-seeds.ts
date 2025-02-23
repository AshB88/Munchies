import { GroceryList } from '../models/index.js';
import { User } from '../models/index.js'; // Import the User model to associate with userId

export const seedGroceryLists = async () => {
  // Fetch users to associate items with userIds
  const users = await User.findAll();

  // Use the fetched users to assign userIds to the grocery list items
  await GroceryList.bulkCreate([
    {
      userId: users[0].id, // Assigning the first user
      category: 'Produce',
      name: 'Apples',
      quantity: 5,
      price: 3.5,
      store: 'Whole Foods',
      date: '2025-02-22',
    },
    {
      userId: users[1].id, // Assigning the second user
      category: 'Dairy',
      name: 'Milk',
      quantity: 2,
      price: 2.5,
      store: 'Trader Joe\'s',
      date: '2025-02-22',
    },
    {
      userId: users[2].id, // Assigning the third user
      category: 'Bakery',
      name: 'Bread',
      quantity: 3,
      price: 1.5,
      store: 'Safeway',
      date: '2025-02-22',
    },
  ]);
};
