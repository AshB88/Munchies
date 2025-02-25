import React, { useState, ChangeEvent, FormEvent } from 'react';
import Item from '../interfaces/Item.interface';

// Define the props for the EditItemForm component
interface EditItemFormProps {
  item: Item;
  onSave: (updatedItem: Item) => void;
  onCancel: () => void;
}

// EditItemForm component
const EditItemForm: React.FC<EditItemFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Item>(item);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

// Define the handleSubmit function
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Return the form
  return (
    <form onSubmit={handleSubmit} className="editForm">
      <h2>Edit Item</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price ?? ''} onChange={handleChange} />
      </div>
      <div>
        <label>Store:</label>
        <input type="text" name="store" value={formData.store ?? ''} onChange={handleChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <div className='button-container'>
        <button type="submit" className="editButton">Save</button>
        <button type="button" className="editButton" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditItemForm;