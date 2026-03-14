import { useSelector, useDispatch } from "react-redux";
import { addItemToCurrentOrder, removeReduceItemFromCurrentOrder, submitOrder } from "@/store/slices/orderSlice";
import { selectDetails } from "@/store/slices/userSlice";

const OrderPopUp = ({ onClose }) => {
    const items = useSelector(state => state.order.items);
    const dispatch = useDispatch();
    const userDetails = useSelector(selectDetails)

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmitOrder = async () => {
        if (items.length === 0) return;

        if (userDetails?.role !== 'client') {
        alert("Only table customers can submit orders through the cart.");
        return;
    }

        const orderData = {
            table_id: userDetails?.table_id,
            items: items.map((item) => ({
                item_id: item.id,
                item_type: item.type === "menuItem" ? "menu_item" : "wine",
                quantity: item.quantity,
            }))
        };
        console.log("Submitting orderData:", orderData);
        console.log("userDetails:", userDetails);

        try {
            await dispatch(submitOrder(orderData)).unwrap();
            onClose();
            alert("Order submitted successfully!");
        } catch (err) {
            console.error("Failed to submit order:", err);
            alert("Failed to submit order. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <h2 className="font-display text-2xl text-restaurant-dark">Your Order</h2>
                        <button 
                            onClick={onClose}
                            className="text-restaurant-dark text-3xl hover:text-restaurant-accent leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {items.length === 0 ? (
                        <p className="text-restaurant-text-light text-center py-8">No items yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.key} className="flex justify-between items-start border-b border-gray-200 pb-4">
                                    <div className="flex-1">
                                        <p className="font-body font-semibold text-restaurant-dark">{item.name}</p>
                                        <p className="text-sm text-restaurant-text-light font-mono">CHF {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => dispatch(removeReduceItemFromCurrentOrder({ id: item.id, type: item.type }))}
                                            className="w-8 h-8 rounded-full bg-restaurant-accent text-white flex items-center justify-center hover:bg-restaurant-dark transition"
                                        >
                                            −
                                        </button>
                                        
                                        <span className="font-mono text-restaurant-dark w-8 text-center font-semibold">{item.quantity}</span>
                                        
                                        <button 
                                            onClick={() => dispatch(addItemToCurrentOrder(item))}
                                            className="w-8 h-8 rounded-full bg-restaurant-accent text-white flex items-center justify-center hover:bg-restaurant-dark transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center pt-4 border-t-2 border-restaurant-accent">
                                <span className="font-display text-xl text-restaurant-dark">Total:</span>
                                <span className="font-mono text-2xl text-restaurant-accent font-bold">
                                    CHF {totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <button 
                                onClick={handleSubmitOrder}
                                className="w-full bg-restaurant-accent hover:bg-restaurant-dark text-white font-body font-semibold py-3 rounded-xl mt-4 transition-colors"
                            >
                                Submit Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPopUp;