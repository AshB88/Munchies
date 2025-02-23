import { PurchasedItems } from '../models/index.js';
import { User } from '../models/index.js'; // Import the User model to associate with userId

export const seedPurchasedItems = async () => {
  // Fetch users to associate items with userIds
  const users = await User.findAll();

  // Use the fetched users to assign userIds to the purchased items
  await PurchasedItems.bulkCreate([
    {
      userId: users[0].id, // Assigning the first user
      category: 'Produce',
      name: 'Bananas',
      quantity: 6,
      price: 2.0,
      store: 'Whole Foods',
      date: '2025-02-21',
    },
    {
      userId: users[1].id, // Assigning the second user
      category: 'Dairy',
      name: 'Cheddar Cheese',
      quantity: 1,
      price: 5.99,
      store: 'Trader Joe\'s',
      date: '2025-02-21',
    },
    {
      userId: users[2].id, // Assigning the third user
      category: 'Frozen Foods',
      name: 'Frozen Peas',
      quantity: 2,
      price: 3.0,
      store: 'Safeway',
      date: '2025-02-21',
    },
    {
      userId: users[0].id, // Assigning the first user
      category: 'Bakery',
      name: 'Croissants',
      quantity: 4,
      price: 4.5,
      store: 'Whole Foods',
      date: '2025-02-21',
    },
    {
      userId: users[1].id, // Assigning the second user
      category: 'Beverages',
      name: 'Orange Juice',
      quantity: 2,
      price: 3.25,
      store: 'Trader Joe\'s',
      date: '2025-02-21',
    },
    {
      userId: users[2].id, // Assigning the third user
      category: 'Snacks',
      name: 'Potato Chips',
      quantity: 3,
      price: 2.5,
      store: 'Safeway',
      date: '2025-02-21',
    },
  ]);
};
