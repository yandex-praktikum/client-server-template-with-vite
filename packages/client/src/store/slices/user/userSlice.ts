import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserFromServer } from "@/api/typesApi";
import { RootState } from "@/store/store";

const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: (storedUser
            ? JSON.parse(storedUser)
            : null) as Nullable<UserFromServer>,
    },
    reducers: {
        setUser: (
            state,
            { payload }: PayloadAction<Nullable<UserFromServer>>
        ) => {
            state.user = payload;
        },
    },
});

export const userSelectors = {
    all: (state: RootState) => state.user,
};

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
