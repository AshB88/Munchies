import React, { useState } from "react";
import Item from "../interfaces/Item.interface"; // Ensure correct import


interface GroceryFormProps {
  onAddItem: (item: Item) => void;
}

const GroceryForm: React.FC<GroceryFormProps> = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState<Item>({
    category: null,
    name: "",
    quantity: 1,
    price: null,
    store: null,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = () => {
    if (newItem.name.trim()) {
      onAddItem(newItem);
      setNewItem({
        category: null,
        name: "",
        quantity: 1,
        price: null,
        store: null,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="grocery-form">
      <h2>Add Item</h2>
      <div className="input-group">
        <label>Item</label>
        <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
      </div>

      <div className="input-group">
        <label>Quantity</label>
        <input type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })} />
      </div>

      <div className="input-group">
        <label>Price</label>
        <input type="number" value={newItem.price ?? ""} onChange={(e) => setNewItem({ ...newItem, price: e.target.value ? parseFloat(e.target.value) : null })} />
      </div>

      <div className="input-group">
        <label>Store</label>
        <input type="text" value={newItem.store ?? ""} onChange={(e) => setNewItem({ ...newItem, store: e.target.value || null })} />
      </div>

      <div className="input-group">
        <label>Date</label>
        <input type="date" value={newItem.date} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
      </div>

      <button onClick={handleSubmit} className="add-button">Add Item</button>
    </div>
  );
};

export default GroceryForm;
