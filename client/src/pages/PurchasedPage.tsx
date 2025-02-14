import Item from "../interfaces/Item.interface";
import { useState, useEffect } from "react";

const PurchasedItems = () => {

    const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);

    useEffect(() => {
        const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
        setPurchasedItems(purchasedItems);
    }, []);

    return (
        <>
            <h1>Purchased Items</h1>
            {purchasedItems.length === 0 ? (
                <p>No Items Purchased Yet!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
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
                                <td>{item.category}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.store}</td>
                                <td>{item.date}</td>
                                <td><button onClick={() => {
                                    const newItems = purchasedItems.filter((_, i) => i !== index);
                                    setPurchasedItems(newItems);
                                    localStorage.setItem('purchasedItems', JSON.stringify(newItems));
                                }} className="remove">Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PurchasedItems;