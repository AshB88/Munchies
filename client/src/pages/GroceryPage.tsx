import React, { useState, useEffect } from "react";
import "../../styles/GroceryPage.css";
import GroceryForm from "../components/GroceryForm";
import GroceryList from "../components/GroceryList";
import Item from "../interfaces/Item.interface";

const GroceryPage: React.FC = () => {
  const [groceryList, setGroceryList] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("groceryList") || "[]");
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const storedPurchased = JSON.parse(localStorage.getItem("purchasedItems") || "[]");

    setGroceryList(storedList);
    setFavorites(storedFavorites);
    setPurchasedItems(storedPurchased);
  }, []);

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [groceryList, favorites, purchasedItems]);

  const addItem = (item: Item) => {
    setGroceryList([...groceryList, item]);
  };

  const moveToPurchased = (item: Item) => {
    setGroceryList(groceryList.filter(g => g !== item));
    setPurchasedItems([...purchasedItems, item]);
  };

  const deleteItem = (item: Item) => {
    setGroceryList(groceryList.filter(g => g !== item));
  };

  const addToFavorites = (item: Item) => {
    if (!favorites.find(fav => fav.name === item.name)) {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <GroceryForm onAddItem={addItem} />
      <GroceryList
        groceryList={groceryList}
        onAddToFavorites={addToFavorites}
        onDeleteItem={deleteItem}
        onMoveToPurchased={moveToPurchased}
      />
    </div>
  );
};

export default GroceryPage;
