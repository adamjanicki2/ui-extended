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
// ...
<Autocomplete
  value={value1}
  onInputChange={(e) => setValue1(e.target.value)}
  options={fruits}
  filterOption={(option) =>
    option.toLowerCase().includes(value1.toLowerCase())
  }
  onSelect={(value) => setValue1(value)}
  InputProps={{
    inputProps: { placeholder: "Fruits" },
  }}
  popoverProps={{
    offset: 8,
  }}
/>
<Autocomplete
  value={value2}
  onInputChange={(e) => setValue2(e.target.value)}
  options={titles}
  filterOption={(option) =>
    option.title.toLowerCase().includes(value2.toLowerCase())
  }
  onSelect={(value) => setValue2(value.title)}
  groupBy={(option) => option.type}
  renderGroup={(group) => (
    <div>{capitalize(group)}s</div>
  )}
  renderOption={(option) => (
    <div>
      <span>{option.title}</span>
      <div>
        {option.year} | {option.rating}%
      </div>
    </div>
  )}
  InputProps={{
    startIcon: "🎬",
    inputProps: { placeholder: "Reviews" },
  }}
  popoverProps={{
    offset: 8,
  }}
/>
`;

export const popoversSnippet = `
import { Popover } from "@adamjanicki/ui-extended";

<Button
  ref={ref1}
  onClick={() => setPopoverOpen1(!popoverOpen1)}
>
  Toggle popover
</Button>
<Popover
  triggerRef={ref1}
  open={popoverOpen1}
  onClose={() => setPopoverOpen1(false)}
>
  <div>I'm a popover!</div>
</Popover>
<Button
  ref={ref2}
  variant="secondary"
  onClick={() => setPopoverOpen2(!popoverOpen2)}
>
  Open menu
</Button>
<Popover
  triggerRef={ref2}
  open={popoverOpen2}
  onClose={() => setPopoverOpen2(false)}
  returnFocusOnEscape={false}
  placement="bottom-start"
  offset={8}
>
  <UnstyledButton>
    Menu Item 1
  </UnstyledButton>
  <UnstyledButton>
    Menu Item 2
  </UnstyledButton>
  <UnstyledButton>
    Menu Item 3
  </UnstyledButton>
</Popover>
`;

export const tooltipSnippet = `
import { Tooltip } from "@adamjanicki/ui-extended";

<Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="left">
  <div>Left</div>
</Tooltip>
<Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="top">
  <div>Top</div>
</Tooltip>
<Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="bottom">
  <div>Bottom</div>
</Tooltip>
<Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="right">
  <div>Right</div>
</Tooltip>
`;
