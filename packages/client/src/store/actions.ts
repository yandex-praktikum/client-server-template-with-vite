import { UserFromServer } from "../api/typesApi";

export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";

export const addUser = (user: UserFromServer) => {
    return { type: ADD_USER, user };
};
