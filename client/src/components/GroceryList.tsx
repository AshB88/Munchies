import React from 'react';
import Item from '../interfaces/Item.interface';

interface GroceryListProps {
  groceryList: Item[];
  onDeleteItem: (id: number) => void;
  setPurchasedItems: (item: Item) => void;  // Correct type for setPurchasedItems
}

const GroceryList: React.FC<GroceryListProps> = ({ groceryList, onDeleteItem, setPurchasedItems }) => {
  const handleMoveToPurchased = async (item: Item) => {
    // Call the setPurchasedItems to move the item to the purchased list
    setPurchasedItems(item);
    onDeleteItem(item.id);  // Delete from grocery list
  };

  return (
    <div className="grocery-list" id="grocery-list-container">
      <table>
        <tbody>
          {groceryList.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price ?? 'N/A'}</td>
              <td>{item.store ?? 'N/A'}</td>
              <td>{item.date}</td>
              <td>
                <button id="purchased" onClick={() => handleMoveToPurchased(item)}>✔</button>
              </td>
              <td>
                <button id="delete" onClick={() => onDeleteItem(item.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
};

export default GroceryList;