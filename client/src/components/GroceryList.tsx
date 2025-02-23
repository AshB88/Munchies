import React from "react";
import Item from "../interfaces/Item.interface";

interface GroceryListProps {
  groceryList: Item[];
  onAddToFavorites: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  onMoveToPurchased: (item: Item) => void;
}
/*
const GroceryList: React.FC<GroceryListProps> = ({ groceryList, onAddToFavorites, onDeleteItem, onMoveToPurchased }) => {
  return (  
    <div className="grocery-list">
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
    </div>
  );
};

export default GroceryList;
*/

const GroceryList: React.FC<GroceryListProps> = ({ groceryList, onAddToFavorites, onDeleteItem, onMoveToPurchased }) => {
  return (
    <div>
      <table>
        <tbody>
          {groceryList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price ?? "N/A"}</td>
              <td>{item.store ?? "N/A"}</td>
              <td>{item.date}</td>
              <td><button id="favorite" onClick={() => onAddToFavorites(item)}>⭐</button></td>
              <td><button id="purchased" onClick={() => onMoveToPurchased(item)}>✔</button></td>
              <td><button id="delete" onClick={() => onDeleteItem(item)}>🗑</button></td>
            </tr>
          ))}
        </tbody>      
      </table>
    </div>
  );
}

export default GroceryList;