import App from "./src/App";
import { renderToString } from "react-dom/server";
import React from "react";

export function render() {
    return renderToString(<App />);
}
