import { useDispatch, useSelector } from "react-redux";
import { addItemToCurrentOrder, removeItemCompletely } from "@/store/slices/orderSlice";

export const useCartToggle = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.order.items);

    const toggleItem = (item, type) => {
        const key = `${type}-${item.id}`;
        const isInCart = cartItems.some(cartItem => cartItem.key === key);

        if (isInCart) {
            dispatch(removeItemCompletely({ id: item.id, type }));
        } else {
            dispatch(addItemToCurrentOrder({ 
                id: item.id,
                type,
                name: item.name,
                price: item.price,
            }));
        }
    };

    const isInCart = (itemId, type) => {
        return cartItems.some(item => item.key === `${type}-${itemId}`);
    };

    return { toggleItem, isInCart };
};