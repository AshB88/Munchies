import Auth from '../utils/auth';
import Item from '../interfaces/Item.interface';

// Retrieve purchased list for the logged-in user
const retrievePurchasedList = async () => {
  try {
    const response = await fetch('/api/purchased-list', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid purchased list API response, check network tab!');
    }

    return data; // Return the fetched purchased list data

  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

// Delete item from the purchased list
const deletePurchasedItem = async (id: number) => {
  try {
    const response = await fetch(`/api/purchased-list/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    return true; // Return success
  } catch (error) {
    console.error("Error deleting item:", error);
    return false; // Return failure
  }
};

// Edit item in the purchased list
const updatePurchasedItem = async (item: Item): Promise<boolean> => {
  try {
    const response = await fetch(`/api/purchased-list/${item.id}`, {
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
      throw new Error(error.message || 'Failed to edit item');
    }

    return true; // Indicate success
  } catch (err) {
    console.error('Error editing item:', err);
    return false; // Indicate failure
  }
}

// Export functions
export { retrievePurchasedList, deletePurchasedItem, updatePurchasedItem };
