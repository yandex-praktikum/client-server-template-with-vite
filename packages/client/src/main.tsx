import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById("root") as HTMLElement;
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

if (rootElement.innerHTML === "<!--ssr-insertion-->") {
    ReactDOM.createRoot(rootElement).render(app);
} else {
    ReactDOM.hydrateRoot(rootElement, app);
}
