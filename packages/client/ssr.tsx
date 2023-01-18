import React from "react";
import App from "./src/App";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { createStore } from "@/store/store";
import ConfigProvider from "antd/lib/config-provider";
import { appTheme } from "@/constants/appTheme";
import { ErrorBoundary } from "@/pages/errorPages/ErrorBoundary";

export { createStore };

export function render(store: any, url: string) {
    return renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <ConfigProvider theme={appTheme}>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </ConfigProvider>
            </StaticRouter>
        </Provider>
    );
}
