import dotenv from "dotenv";
dotenv.config();

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass|png|svg|jpg)$": "identity-obj-proxy",
        "^antd/es/": "antd/lib/",
    },

    transformIgnorePatterns: [
        "/node_modules/(?!antd|rc-.+?|@babel/runtime|@ant-design).+(js|jsx)$",
    ],
    setupFiles: ["<rootDir>/src/tests/setup.js"],
};
