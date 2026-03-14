import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useOrders } from "../../hooks/useOrders";

const OrdersDashboard = () => {
    const { orders, loading, error, updateOrderStatus } = useOrders();


    return (
        <div>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrdersDashboard;