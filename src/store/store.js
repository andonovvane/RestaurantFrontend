import { configureStore } from "@reduxjs/toolkit";
import winesReducer from "./slices/wines"
import menuItemReducer from "./slices/menuItems"
import userReducer from "./slices/userSlice"
import orderReducer from "./slices/orderSlice"


const store = configureStore ({
    reducer: {
        wine: winesReducer,
        menuItems: menuItemReducer,
        user: userReducer,
        order: orderReducer,
    },
});

export default store;