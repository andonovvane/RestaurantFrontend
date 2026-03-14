import { useDispatch, useSelector } from "react-redux";
import { addItemToCurrentOrder, removeItemCompletely } from "@/store/slices/orderSlice";

const MenuCategory = ({ items }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.order.items);

    const handleBtnClick = (item) => {
        const key = `menuItem-${item.id}`;
        const isInCart = cartItems.some(cartItem => cartItem.key === key);

        if (isInCart) {
            // Remove completely from cart
            dispatch(removeItemCompletely({ id: item.id, type: "menuItem" }));
        } else {
            // Add to cart
            dispatch(addItemToCurrentOrder({ ...item, type: "menuItem" }));
        }
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-5">
            {items.map((item) => {
                const key = `menuItem-${item.id}`;
                const isInCart = cartItems.some(cartItem => cartItem.key === key);
                const btnTxt = isInCart ? "Added to Order List" : "Add to Order List";

                return (
                    <div 
                        key={item.id} 
                        className="flex flex-col w-full h-[450px] bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
                    >
                        <img
                            src={item.image_item}
                            alt={item.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="flex-1 flex flex-col justify-between p-4">
                            <h1 className="text-xl font-semibold truncate">{item.name}</h1>
                            <p className="text-gray-400 text-sm mt-1 truncate">
                                {item.ingredients.map(ing => ing.name).join(", ")}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">{item.price} CHF</span>
                                <button 
                                    onClick={() => handleBtnClick(item)}
                                    className={`px-3 py-1 rounded-lg border transition ${
                                        isInCart ? 'bg-red-500 border-red-600' : 'hover:bg-white/10'
                                    }`}
                                >
                                    {btnTxt}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MenuCategory;