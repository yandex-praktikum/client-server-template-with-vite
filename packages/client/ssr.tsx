import App from "./src/App";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Store, AnyAction } from "@reduxjs/toolkit";
import { StaticRouter } from "react-router-dom/server";

export function render(url: string) {
    return renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
}
