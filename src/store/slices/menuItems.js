import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice = createSlice({
    name: "menuItems",
    initialState: {
        starters: [],
        mainCourses: [],
        desserts: [],
    },
    reducers: {
        setMenuItems: (state, action) => {
            state.starters = action.payload.filter((item) => item.category === "starters");
            state.mainCourses = action.payload.filter((item) => item.category === "main_course");
            state.desserts = action.payload.filter((item) => item.category === "desserts");
        },
    },
});

export const { setMenuItems } = menuItemsSlice.actions;

export default menuItemsSlice.reducer;

export const selectStarters = (state) => state.menuItems?.starters || [];
export const selectMainCourses = (state) => state.menuItems?.mainCourses || [];
export const selectDesserts = (state) => state.menuItems?.desserts || [];
