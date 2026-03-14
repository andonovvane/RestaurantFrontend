import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/API/api";

// Submit Order
export const submitOrder = createAsyncThunk(
    "order/submitOrder",
    async (orderData, thunkAPI) => {
        try {
            const response = await api.post("/orders/", orderData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Submit order failed");
        }
    }
);

const initialState = {
    items: [],
    submittedOrders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addItemToCurrentOrder: (state, action) => {
            const item = action.payload;
            const key = `${item.type}-${item.id}`;
            const existingItem = state.items.find(i => i.key === key);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...item,
                    key,
                    quantity: 1,
                });
            }
        },

        removeReduceItemFromCurrentOrder: (state, action) => {
            const { id, type } = action.payload;
            const key = `${type}-${id}`;
            const existingItem = state.items.find(i => i.key === key);

            if (!existingItem) return;

            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.key !== key);
            }
        },

        removeItemCompletely: (state, action) => {
            const { id, type } = action.payload;
            const key = `${type}-${id}`;
            state.items = state.items.filter(i => i.key !== key);
        },

        clearCurrentOrder: (state) => {
            state.items = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.submittedOrders.push(action.payload);
                state.items = [];
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    addItemToCurrentOrder,
    removeReduceItemFromCurrentOrder,
    removeItemCompletely,
    clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;