import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store.ts";

export const searchSlice = createSlice({
    name: "search",
    initialState: '',
    reducers: {
        setSearch: (_, action: PayloadAction<string>) => action.payload,
    }
})

export const selectSearch = (state: RootState) => state.search;
export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
