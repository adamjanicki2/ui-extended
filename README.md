# @adamjanicki/ui-extended

**Warning: use at own risk, these are mainly for personal use across my other sites, so while I strive to write good code, there may be bugs!**

## Installation

```bash
npm install @adamjanicki/ui-extended
```

## Usage

```ts
// Add here
```

## Importing CSS

Unfortunately, there was no great way to handle CSS. I often hate how large libraries make it extremely difficult to override CSS without using `!important`, or using inline styles. So, I've decided to just import the CSS directly into your project. Here's an example of how to do it:

```ts
import React from "react";
import ReactDOM from "react-dom/client";
// Make sure to import this first so your styles take priority!
import "@adamjanicki/ui-extended/style.css";
// All your other global styles can go here!
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
```
