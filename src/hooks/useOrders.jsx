import { useEffect, useState } from "react";
import { api } from "@/API/api";


export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders/");
            setOrders(response.data);
            // console.log("Fetched orders:", response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
            setError(error.response?.data?.detail || error.message || "Failed to fetch orders");
            setOrders([]);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/orders/${orderId}/status/`, { status: newStatus });
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status. Please try again.");
        }
    };
    useEffect(() => {
        fetchOrders();

        const intervalId = setInterval(() => {
            fetchOrders(); // Refresh every 3 min
        }, 180000);

        return () => clearInterval(intervalId);
    }, []);


    return { orders, loading, error, fetchOrders, updateOrderStatus };
}