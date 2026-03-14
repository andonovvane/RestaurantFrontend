import OrderCard from "@/components/OrderCard/OrderCard";
import { useOrders } from "../../hooks/useOrders";


const KitchenView = () => {
    const { orders, loading, error, updateOrderStatus } = useOrders();

    const pendingOrders = orders.filter(order => order.status === "pending");
    const inProgressOrders = orders.filter(order => order.status === "in_progress");

    return (
        <div>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p>Error loading orders: {error}</p>
            ) : (
                <div className="mt-14 flex flex-between gap-4 ml-4 mr-4">
                    <div className="flex flex-col gap-4 w-1/2">
                        <div className="mb-8 text-center"><h1>Pending Orders</h1></div>
                        {pendingOrders.map(order => (
                            <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus} className="border bg-zinc-900 text-white pl-8 pb-6" />
                            )
                        )}
                    </div>
                    <div className="flex flex-col gap-4 w-1/2">
                        <div className="mb-8 text-center"><h1>In Progress Orders</h1></div>
                        {inProgressOrders.map(order => (
                            <OrderCard key={order.id} order={order} updateOrderStatus={updateOrderStatus} className="border bg-zinc-900 text-white pl-8 pb-6" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default KitchenView;