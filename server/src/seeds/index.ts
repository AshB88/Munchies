import { seedUsers } from './user-seeds.js';
import { seedGroceryLists } from './grocery-seeds.js';  // Import grocery list seeding function
import { seedPurchasedItems } from './purchased-seeds.js';  // Import purchased items seeding function
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedGroceryLists();  // Seed grocery lists
    console.log('\n----- GROCERY LISTS SEEDED -----\n');
    
    await seedPurchasedItems();  // Seed purchased items
    console.log('\n----- PURCHASED ITEMS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
