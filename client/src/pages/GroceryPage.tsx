import React, { useState, useEffect } from "react";
import "../../styles/GroceryPage.css";
import GroceryForm from "../components/GroceryForm";
import GroceryList from "../components/GroceryList";
import Item from "../interfaces/Item.interface";
import EditItemForm from '../components/EditForm';
import Auth from '../utils/auth';
import { retrieveGroceryList, addGroceryItem, moveToPurchased as moveToPurchasedAPI, deleteGroceryItem, updateGroceryItem } from '../api/groceryAPI';


const GroceryPage: React.FC = () => {
  // State to hold the grocery list
  const [groceryList, setGroceryList] = useState<Item[]>([]);
  // State to hold the item being edited
  const [editItem, setEditItem] = useState<Item | null>(null);
  // State for active card
  const [activeCard, setActiveCard] = useState(0);
  // State for smaller screen
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 980);

  //Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 980);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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

  // Toggle card navigation
  const nextCard = () => setActiveCard((activeCard + 1) % 2);
  const prevCard = () => setActiveCard((activeCard - 1 +2) % 2);

return (
  <div className="grocery-page-container">
    {editItem ? (
      <EditItemForm item={editItem} onSave={handleSave} onCancel={handleCancel} />
    ) : (
      isSmallScreen ? (
        <div className="toggle-container">
          <div className="card">
            {activeCard === 0 ? (
              <>
                <GroceryForm onAddItem={addItem} />
              </>
            ) : (
              <>
                <h2>Grocery List</h2>
                {groceryList.length > 0 ? (
                  <GroceryList
                    groceryList={groceryList}
                    onDeleteItem={onDeleteItem}
                    setPurchasedItems={moveToPurchased}
                    onEditItem={setEditItem}
                  />
                ) : (
                  <p>No items yet.</p>
                )}
              </>
            )}
            <div className="toggle-buttons">
              <button onClick={prevCard} disabled={activeCard === 0}>&lt; Prev</button>
              <button onClick={nextCard} disabled={activeCard === 1}>Next &gt;</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card" id="grocery-form-container">
            <GroceryForm onAddItem={addItem} />
          </div>
          <div className="card" id="grocery-list-container">
            <h2>Grocery List</h2>
            {groceryList.length > 0 ? (
              <GroceryList
                groceryList={groceryList}
                onDeleteItem={onDeleteItem}
                setPurchasedItems={moveToPurchased}
                onEditItem={setEditItem}
              />
            ) : (
              <p>No items yet.</p>
            )}
          </div>
        </>
      )
    )}
  </div>
);
};

export default GroceryPage;