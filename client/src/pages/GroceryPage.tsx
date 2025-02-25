import React, { useState, useEffect } from "react";
import "../../styles/GroceryPage.css";
import GroceryForm from "../components/GroceryForm";
import GroceryList from "../components/GroceryList";
import Item from "../interfaces/Item.interface";
import Auth from '../utils/auth';
import { retrieveGroceryList, addGroceryItem, moveToPurchased as moveToPurchasedAPI, deleteGroceryItem, updateGroceryItem } from '../api/groceryAPI';
import EditItemForm from '../components/EditForm';

const GroceryPage: React.FC = () => {
  // State to hold the grocery list
  const [groceryList, setGroceryList] = useState<Item[]>([]);
  // State to hold the item being edited
  const [editItem, setEditItem] = useState<Item | null>(null);

  // Fetch the grocery list when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const list = await retrieveGroceryList();
      const sortedList = list.sort((a: Item, b: Item) => a.id - b.id); // Sort the list by id
      setGroceryList(sortedList);
    };
    fetchData();
  }, []);

  // Function to add an item to the grocery list
  const addItem = async (item: Item) => {
    const addedItem = await addGroceryItem(item);
    if (addedItem) {
      setGroceryList([...groceryList, addedItem]);
    }
  };

  // Function to delete an item from the grocery list
  const onDeleteItem = async (id: number) => {
    const success = await deleteGroceryItem(id);
    
    if (success) {
      setGroceryList(groceryList.filter(item => item.id !== id));
    } else {
      console.error("Failed to delete item from database");
    }
  };

  // Function to move an item to the purchased list
  const moveToPurchased = async (item: Item) => {
    // Get the token from Auth
    const token = Auth.getToken();

    if (!token) {
      console.error('No token found');
      return;
    }

    // Call the API to move the item to the purchased list
    const response = await moveToPurchasedAPI(item); // Pass the token to the API function

    if (response && response.success) {
      // Remove the item from the grocery list in the state after it's successfully moved
      setGroceryList(groceryList.filter(g => g.id !== item.id));
    } else {
      console.error('Failed to move item');
    }
  };

  // Function to handle saving an edited item
  const handleSave = async (item: Item) => {
    const updatedItem = await updateGroceryItem(item);
    if (updatedItem) {
      setGroceryList((prevList) => 
        prevList.map((g) => (g.id === item.id ? updatedItem : g))
      );
    }

    setEditItem(null);
  };

  // Function to handle canceling the edit
  const handleCancel = () => {
    setEditItem(null);
  };

  return (
    <div className="grocery-page-container">
      {editItem ? (
        // Render the edit form if an item is being edited
        <EditItemForm item={editItem} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <div className="card" id="grocery-form-container">
            <GroceryForm onAddItem={addItem} />
          </div>
          <div className="card" id="grocery-list-container">
            <div className="grocery-list">
              <h2>Grocery List</h2>
              {groceryList.length > 0 ? (
                // Render the grocery list if there are items
                <GroceryList
                  groceryList={groceryList}
                  onDeleteItem={onDeleteItem}
                  setPurchasedItems={moveToPurchased}
                  onEditItem={setEditItem}
                />
              ) : (
                // Render a message if there are no items
                <p>No items yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroceryPage;