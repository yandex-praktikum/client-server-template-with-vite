export type ResponseStatus = {
    ok: string;
};

export type APIError = {
    reason: string;
    status: string;
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
