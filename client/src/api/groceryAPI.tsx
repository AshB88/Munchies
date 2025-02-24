import Auth from '../utils/auth';
import Item from '../interfaces/Item.interface'; // Importing Item interface from the interfaces folder

// Retrieve grocery list for the logged-in user
const retrieveGroceryList = async () => {
  try {
    const response = await fetch('/api/grocery-list', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // Sending token to authenticate
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch grocery list');
    }

    const data = await response.json();
    return data; // Return the grocery list data
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return []; // Return an empty list in case of error
  }
};

// Add a new item to the grocery list
const addGroceryItem = async (item: Item) => {
  try {
    const response = await fetch('/api/grocery-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // Sending token to authenticate
      },
      body: JSON.stringify(item),
    });

    // Check if the response is successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add grocery item');
    }

    const data = await response.json();
    return data; // Return the added item data
  } catch (err) {
    console.error('Error from adding item:', err);
    return null; // Return null in case of error
  }
};

// Move item to purchased list
const moveToPurchased = async (item: Item): Promise<{ success: boolean }> => {
  const token = Auth.getToken(); // Ensure this is retrieving a valid token
  console.log('Token retrieved:', token); // Check if the token is valid

  if (!token) {
    console.error('No authentication token found');
    return { success: false };
  }

  const response = await fetch(`/api/purchased-list/move-to-purchased/${item.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
    },
  });
  
  // Check the response status
  if (response.ok) {
    console.log('Item moved to purchased');
    return { success: true };
  } else {
    console.error('Failed to move item');
    return { success: false };
  }
};

const deleteGroceryItem = async (id: number) => {
  try {
    const response = await fetch(`/api/grocery-list/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete grocery item");
    }

    return true; // Indicate successful deletion
  } catch (error) {
    console.error("Error deleting grocery item:", error);
    return false; // Indicate failure
  }
};

// Edit item in the grocery list
const updateGroceryItem = async (item: Item) => {
  try {
    const response = await fetch(`/api/grocery-list/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // Sending token to authenticate
      },
      body: JSON.stringify(item),
    });

    // Check if the response is successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to edit grocery item');
    }

    const data = await response.json();
    return data; // Return the edited item data
  } catch (err) {
    console.error('Error from editing item:', err);
    return null; // Return null in case of error
  }
};

// Export functions
export { retrieveGroceryList, addGroceryItem, moveToPurchased, deleteGroceryItem, updateGroceryItem };
