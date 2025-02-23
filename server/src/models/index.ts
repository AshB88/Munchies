import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { GroceryListFactory } from './grocery-list.js';
import { PurchasedItemsFactory } from './purchased-items.js';

// Initialize models
const User = UserFactory(sequelize);
const GroceryList = GroceryListFactory(sequelize);
const PurchasedItems = PurchasedItemsFactory(sequelize);

// Define relationships (associations)
User.hasMany(GroceryList, { foreignKey: 'userId' });
User.hasMany(PurchasedItems, { foreignKey: 'userId' });
GroceryList.belongsTo(User, { foreignKey: 'userId' });
PurchasedItems.belongsTo(User, { foreignKey: 'userId' });

// Export models
export { User, GroceryList, PurchasedItems };
