import React, { useState, useEffect } from "react";
import "../../styles/GroceryList.css";

// Interface to define the structure of a grocery item
interface GroceryItem {
  category?: string;
  item: string;
  quantity?: number;
  price: number;
  store: string;
  date: string;
}

const GroceryList: React.FC = () => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState<GroceryItem>({
    category: "",
    item: "",
    quantity: 0,
    price: 0,
    store: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [favorites, setFavorites] = useState<GroceryItem[]>([]);

  useEffect(() => {
    const storedList = localStorage.getItem("groceryList");
    const storedFavorites = localStorage.getItem("favorites");
    if (storedList) setGroceryList(JSON.parse(storedList));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [groceryList, favorites]);

  const addItem = () => {
    if (newItem.item.trim()) {
      setGroceryList([...groceryList, { ...newItem, category: "" }]);
      setNewItem({ category: "", item: "", quantity: 0, price: 0, store: "", date: new Date().toISOString().split("T")[0] });
    }
  };

  const moveToPurchased = () => {
    localStorage.setItem("purchasedList", JSON.stringify(groceryList));
    setGroceryList([]);
  };

  const addToFavorites = (item: GroceryItem) => {
    if (!favorites.find(fav => fav.item === item.category)) {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <div className="form-container">
        <div className="input-group">
          <label>Item</label>
          <input type="text" value={newItem.item} onChange={(e) => setNewItem({ ...newItem, item: e.target.value })} />
        </div>

        <div className="input-group">
          <label>Quantity</label>
          <input type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })} />
        </div>

        <div className="input-group">
          <label>Price</label>
          <input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} />
        </div>

        <div className="input-group">
          <label>Store</label>
          <input type="text" value={newItem.store} onChange={(e) => setNewItem({ ...newItem, store: e.target.value })} />
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date" value={newItem.date} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
        </div>

        <button onClick={addItem} className="add-button">Add Item</button>
      </div>

      <ul>
        {groceryList.map((item, index) => (
          <li key={index}>
            {item.item} - {item.quantity} - ${item.price} - {item.store} - {item.date}
            <button onClick={() => addToFavorites(item)}>Add to Favorites</button>
          </li>
        ))}
      </ul>

      <button onClick={moveToPurchased}>Move to Purchased</button>
    </div>
  );
};

export default GroceryList;