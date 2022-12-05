import ConfigProvider from "antd/es/config-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { appTheme } from "./constants/appTheme";
import "./index.css";
import { ErrorBoundary } from "./pages/errorPages/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={appTheme}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
