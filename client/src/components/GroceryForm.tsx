import React, { useState } from "react";
import Item from "../interfaces/Item.interface"; // Ensure correct import


interface GroceryFormProps {
  onAddItem: (item: Item) => Promise<void>;
}

// Define the GroceryForm component
const GroceryForm: React.FC<GroceryFormProps> = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState<Item>({
    id: -1,  // Temporary id or leave as -1 if not yet assigned
    category: null,
    name: "",
    quantity: 1,
    price: null,
    store: null,
    date: new Date().toISOString().split("T")[0],
  });

  // Define the handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: name === 'quantity' ? parseInt(value) || 1 :
              name === 'price' ? (value ? parseFloat(value) : null) :
              value,
    }));
  };

  // Define the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddItem(newItem);  // Call the passed-in function
    setNewItem({
      id: -1,
      category: null,
      name: '',
      quantity: 1,
      price: null,
      store: null,
      date: new Date().toISOString().split("T")[0],
    });
  };

  // Return the form
  return (
    <div className="grocery-form">
      <h2>Add Item</h2>
      <div className="input-group">
        <label>Item:</label>
        <input type="text" name="name" value={newItem.name} onChange={handleChange} />
      </div>

      <div className="input-group">
        <label>Quantity:</label>
          <input type="number" name="quantity" value={newItem.quantity} onChange={handleChange} />
      </div>

      <div className="input-group">
        <label>Price:</label>
          <input type="number" name="price" value={newItem.price ?? ''} onChange={handleChange} />
      </div>

      <div className="input-group">
        <label>Store:</label>
        <input type="text" name="store" value={newItem.store ?? ''} onChange={handleChange} />
      </div>

      <div className="input-group">
        <label>Date:</label>
        <input type="date" name="date" value={newItem.date} onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className="add-button">Add Item</button>
    </div>
  );
};

export default GroceryForm;
