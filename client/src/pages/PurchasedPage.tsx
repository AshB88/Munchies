import Item from "../interfaces/Item.interface";
import { useState, useEffect } from "react";
import "../../styles/purchased.css";

const PurchasedItems = () => {

    const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);

    useEffect(() => {
        const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
        setPurchasedItems(purchasedItems);
    }, []);

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
                                    <td><button onClick={() => {
                                        const newItems = purchasedItems.filter((_, i) => i !== index);
                                        setPurchasedItems(newItems);
                                        localStorage.setItem('purchasedItems', JSON.stringify(newItems));
                                    }} className="remove">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default PurchasedItems;