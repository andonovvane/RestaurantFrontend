import { useEffect, useState } from "react";
import { api } from "@/API/api";


export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get("/orders/");
            setOrders(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError(
                error.response?.data?.error ||
                error.response?.data?.detail ||
                error.message ||
                "Failed to fetch orders"
            );
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/orders/${orderId}/status/`, { status: newStatus });
            setError(null);
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order status:", error);
            setError(
                error.response?.data?.error ||
                error.response?.data?.detail ||
                error.message ||
                "Failed to update order status"
            );
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