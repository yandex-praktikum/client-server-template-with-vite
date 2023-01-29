import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";
import { MAP_NAME_TO_THEME } from "@/constants/appTheme";
import { ThemeNames, ThemeObject } from "./typings";

const storedThemeName =
    typeof window !== "undefined"
        ? localStorage.getItem("theme")
        : ThemeNames.Dark;

const initialTheme: ThemeObject =
    MAP_NAME_TO_THEME[storedThemeName as ThemeNames] ||
    MAP_NAME_TO_THEME[ThemeNames.Dark];

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: initialTheme,
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
