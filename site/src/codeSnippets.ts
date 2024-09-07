export const importCss = `
// in your root file, like index.tsx:
import React from "react";
import ReactDOM from "react-dom/client";
// import mine first
import "@adamjanicki/ui/style.css";
import "@adamjanicki/ui-extended/style.css";
// then yours below!
import "src/css/style.css";
import App from "src/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

export const autoCompleteSnippet = `
import { AutoComplete } from "@adamjanicki/ui-extended";
`;

export const popoversSnippet = `
import { Popover } from "@adamjanicki/ui-extended";
`;

export const tooltipSnippet = `
import { Tooltip } from "@adamjanicki/ui-extended";
`;
