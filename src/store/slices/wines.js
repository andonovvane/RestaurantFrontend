// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     wines: [],
// }

// const wineSlice = createSlice ({
//     name: "wine",
//     initialState,
//     reducers: {
//         loadWines: (state, action) => {
//             state.wines = action.payload;
//         },
//     },
// });

// export const { loadWines } = wineSlice.actions;
// export default wineSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wines: [],
};

const wineSlice = createSlice({
    name: "wine",
    initialState,
    reducers: {
        loadWines: (state, action) => {
            state.wines = action.payload;
        },
    },
});

// Selector function to get wines from state
export const selectWines = (state) => state.wine.wines;

export const { loadWines } = wineSlice.actions;
export default wineSlice.reducer;
