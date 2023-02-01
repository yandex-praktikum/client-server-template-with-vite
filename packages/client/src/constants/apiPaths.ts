export const SERVER_PORT = 5000;

export const PATH = {
    BASE: "https://ya-praktikum.tech/api/v2/",
    WEBSOCKET: "wss://ya-praktikum.tech/ws/",
    RESOURCES: "resources",
};

export const OAUTH_PATH = {
    BASE: `oauth/yandex`,
    YANDEX_AUTHORIZE: `https://oauth.yandex.ru/authorize?response_type=code`,
    REDIRECT_URL: `http://localhost:${SERVER_PORT}`,
    SERVICE_ID: "oauth/yandex/service-id",
};

export const ENDPOINTS = {
    AUTH: {
        SIGNIN: "auth/signin",
        SIGNUP: "auth/signup",
        SIGNOUT: "auth/logout",
        PROFILE: "auth/user",
    },

    USER: {
        EDIT_PROFILE: "user/profile",
        CHANGE_PROFILE_AVATAR: "user/profile/avatar",
        CHANGE_PASSWORD: "user/password",
    },
};
