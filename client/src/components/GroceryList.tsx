import React from "react";
import Item from "../interfaces/Item.interface";

interface GroceryListProps {
  groceryList: Item[];
  onAddToFavorites: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  onMoveToPurchased: (item: Item) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ groceryList, onAddToFavorites, onDeleteItem, onMoveToPurchased }) => {
  return (
    <ul>
      {groceryList.map((item, index) => (
        <li key={index}>
          {item.name} - {item.quantity} - ${item.price ?? "N/A"} - {item.store ?? "N/A"} - {item.date}
          <button onClick={() => onAddToFavorites(item)}>⭐</button>
          <button onClick={() => onMoveToPurchased(item)}>✔</button>
          <button onClick={() => onDeleteItem(item)}>🗑</button>
        </li>
      ))}
    </ul>
  );
};

export default GroceryList;
