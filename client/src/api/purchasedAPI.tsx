import Auth from '../utils/auth';

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

// Export functions
export { retrievePurchasedList, deletePurchasedItem };
