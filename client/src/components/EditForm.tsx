import React, { useState, ChangeEvent, FormEvent } from 'react';
import Item from '../interfaces/Item.interface';

interface EditItemFormProps {
  item: Item;
  onSave: (updatedItem: Item) => void;
  onCancel: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Item>(item);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditItemForm;