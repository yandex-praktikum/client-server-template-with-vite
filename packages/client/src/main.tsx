import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { appTheme } from "./constants/appTheme";
import "./index.css";
import { ErrorBoundary } from "./pages/errorPages/ErrorBoundary";
import store from "./store/store";
import { Provider } from "react-redux";

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById("root") as HTMLElement;
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider theme={appTheme}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.hydrateRoot(rootElement, app);
