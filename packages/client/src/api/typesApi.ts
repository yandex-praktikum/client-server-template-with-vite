export type Nullable<T> = T | null;

export type ResponseStatus = {
    ok: string;
};

export type LoginRequestData = {
    login: string;
    password: string;
};

export type GetUserByLoginRequestData = {
    login: string;
};

export type ChangeProfileKeys =
    | "login"
    | "first_name"
    | "second_name"
    | "phone"
    | "email"
    | "display_name";

export type ChangeProfileRequestData = Record<ChangeProfileKeys, string>;

export type UserFromServer = ChangeProfileRequestData & {
    id: number;
    avatar: string;
};

export type UserInfoRequestData = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};
