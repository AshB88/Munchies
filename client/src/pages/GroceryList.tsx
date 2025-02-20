import React, { useState, useEffect } from "react";

// Interface to define the structure of a grocery item
interface GroceryItem {
  category?: string; // Optional category of the item
  item: string; // Name of the item
  quantity?: number; // Optional quantity of the item
  price: number; // Price of the item
  store: string; // Store where the item is purchased
  date: string; // Date when the item is added
}

const GroceryList: React.FC = () => {
  // State to hold the list of grocery items
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  
  // State to hold the new item being added
  const [newItem, setNewItem] = useState<GroceryItem>({
    category: "",
    item: "",
    quantity: 0,
    price: 0,
    store: "",
    date: new Date().toISOString().split("T")[0],
  });
  
  // State to hold the list of favorite items
  const [favorites, setFavorites] = useState<GroceryItem[]>([]);

  // Effect to load grocery list and favorites from localStorage on component mount
  useEffect(() => {
    const storedList = localStorage.getItem("groceryList");
    const storedFavorites = localStorage.getItem("favorites");
    if (storedList) setGroceryList(JSON.parse(storedList));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Effect to save grocery list and favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [groceryList, favorites]);

  // Function to add a new item to the grocery list
  const addItem = () => {
    if (newItem.item.trim()) {
      setGroceryList([...groceryList, { ...newItem, category: "" }]);
      setNewItem({ category: "", item: "", quantity: 0, price: 0, store: "", date: new Date().toISOString().split("T")[0] });
    }
  };

  // Function to move all items to the purchased list and clear the grocery list
  const moveToPurchased = () => {
    localStorage.setItem("purchasedList", JSON.stringify(groceryList));
    setGroceryList([]);
  };

  // Function to add an item to the favorites list
  const addToFavorites = (item: GroceryItem) => {
    if (!favorites.find(fav => fav.item === item.category)) {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <div>
        <input type="text" placeholder="Item" value={newItem.item} onChange={(e) => setNewItem({ ...newItem, item: e.target.value })} />
        <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })} />
        <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} />
        <input type="text" placeholder="Store" value={newItem.store} onChange={(e) => setNewItem({ ...newItem, store: e.target.value })} />
        <input type="date" value={newItem.date} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {groceryList.map((item) => (
          <li key={item.category}>
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