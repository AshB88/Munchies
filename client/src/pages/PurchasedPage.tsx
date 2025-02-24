import Item from "../interfaces/Item.interface";
import React, { useState, useEffect } from "react";
import "../../styles/purchased.css";
import { retrievePurchasedList, deletePurchasedItem, updatePurchasedItem } from '../api/purchasedAPI';
import Auth from '../utils/auth';
import EditItemForm from '../components/EditForm';

const PurchasedItems: React.FC = () => {
  const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  // Fetch purchased items when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasedData = await retrievePurchasedList();
        const sortedData = purchasedData.sort((a: Item, b: Item) => a.id - b.id);
        setPurchasedItems(sortedData);
      } catch (error) {
        console.error('Error fetching purchased items:', error);
      }
    };

    if (Auth.getToken()) {
      fetchData();
    }
  }, []);

  // Function to remove an item from the list
  const handleRemove = async (id: number) => {
    const success = await deletePurchasedItem(id);
  
    if (success) {
      setPurchasedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  // Function to edit an item in the list
  const handleEdit = (item: Item) => {
    setEditItem(item);
  };

  const handleSave = async (updatedItem: Item) => {
    const success = await updatePurchasedItem(updatedItem);

    if (success) {
      setPurchasedItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditItem(null);
    }
  }

  const handleCancel = () => {
    setEditItem(null);
  }
  
  return (
    <>
    {editItem ? (
      <EditItemForm item={editItem} onSave={handleSave} onCancel={handleCancel} />
    ) :  purchasedItems.length === 0 ? (
        <div className='notice'>
          <h1>Purchased Items</h1>
          <h2>No Items Purchased Yet!</h2>
        </div>
      ) : (
        <div className="purchased-items">
          <h1>Purchased Items</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Store</th>
                <th>Date</th>
                <th>Remove</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {purchasedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.store}</td>
                  <td>{item.date}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)} className="remove">
                    🗑
                    </button>
                  </td>
                  <td>
                    <button id="edit" onClick={() => handleEdit(item)}>✏️</button>
                  </td>                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default PurchasedItems;