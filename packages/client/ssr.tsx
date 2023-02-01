import React from "react";
import App from "./src/App";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { createStore } from "@/store/store";

export { createStore };

export function render(store: any, url: string) {
    return renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>
    );
}
