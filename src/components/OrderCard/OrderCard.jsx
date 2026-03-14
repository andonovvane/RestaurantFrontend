import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const OrderCard = ({ order, updateOrderStatus }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-red-500 text-white";
            case "in_progress":
                return "bg-yellow-500 text-black";
            case "completed":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };


    return (
        <Card key={order.id} className="border mt-14 ml-4 mr-4 bg-zinc-900 text-white">
            <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Table:</strong> {order.table_id}</p>
                <p><strong>Status:</strong></p>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <p><strong>Items:</strong></p>
                <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                        <li key={index}>
                            {item.item_name} x {item.quantity}
                        </li>
                    ))}
                </ul>

                {order.status === "pending" && (
                    <Button
                        className="bg-white text-black mt-4"
                        onClick={() => updateOrderStatus(order.id, "in_progress")}
                    >
                        Start Preparing
                    </Button>
                )}
                {order.status === "in_progress" && (
                    <Button
                        className="bg-green-500 text-white mt-4"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                    >
                        Mark Complete
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}


export default OrderCard;