//interface for the Item object
export default interface Item {
    id: number;
    category: string | null;
    name: string;
    quantity: number;
    price: number | null;
    store: string | null;
    date: string;
}