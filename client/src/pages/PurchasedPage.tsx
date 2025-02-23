import Item from "../interfaces/Item.interface";
import React, { useState, useEffect } from "react";
import "../../styles/purchased.css";
import { retrievePurchasedList, deletePurchasedItem } from '../api/purchasedAPI';
import Auth from '../utils/auth';

const PurchasedItems: React.FC = () => {
  const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);

  // Fetch purchased items when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasedData = await retrievePurchasedList();
        setPurchasedItems(purchasedData);
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
  
  return (
    <>
      {purchasedItems.length === 0 ? (
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
                      Remove
                    </button>
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