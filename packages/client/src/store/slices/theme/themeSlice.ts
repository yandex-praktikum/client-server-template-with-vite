import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeObject } from "@/api/typesApi";
import { RootState } from "@/store/store";
import { DARK_THEME, LIGHT_THEME } from "@/constants/appTheme";

const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: storedTheme ? JSON.parse(storedTheme) : DARK_THEME,
    },
    reducers: {
        setTheme: (state, { payload }: PayloadAction<ThemeObject>) => {
            state.theme = payload;
        },
    },
});

export const themeSelectors = {
    all: (state: RootState) => state.theme,
};

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
