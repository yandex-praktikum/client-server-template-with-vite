import { combineReducers } from "@reduxjs/toolkit";
import { routerReducer } from "react-router-redux";
import { Nullable, UserFromServer } from "../api/typesApi";
import { ADD_USER, DELETE_USER } from "./actions";

export type Action = {
    type: string;
    user: UserFromServer;
};

const storedUser = localStorage.getItem("user");

export const user = (
    state: Nullable<UserFromServer> = storedUser
        ? JSON.parse(storedUser)
        : null,
    action: Action
): Nullable<UserFromServer> => {
    switch (action.type) {
        case ADD_USER:
            return { ...state, ...action.user };

        case DELETE_USER: {
            return null;
        }

        default:
            return state;
    }
};

const rootReducer = combineReducers({ routerReducer, user });

export default rootReducer;
