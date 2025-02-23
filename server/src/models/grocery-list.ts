import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js'; // Import the User model to establish the relationship

// Define the attributes for the GroceryList model
interface GroceryListAttributes {
  id: number;
  userId: number; // Foreign key referring to the User model
  category: string | null;
  name: string;
  quantity: number;
  price: number | null;
  store: string | null;
  date: string;
}

// Define the optional attributes for creating a new GroceryList
interface GroceryListCreationAttributes extends Optional<GroceryListAttributes, 'id'> {}

export class GroceryList extends Model<GroceryListAttributes, GroceryListCreationAttributes> implements GroceryListAttributes {
  public id!: number;
  public userId!: number;
  public category!: string | null;
  public name!: string;
  public quantity!: number;
  public price!: number | null;
  public store!: string | null;
  public date!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the GroceryListFactory function to initialize the GroceryList model
export function GroceryListFactory(sequelize: Sequelize): typeof GroceryList {
  GroceryList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,  // Reference to the User model
          key: 'id',
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      store: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'grocery_lists',  // Name of the table in PostgreSQL
      sequelize,
    }
  );

  return GroceryList;
}
