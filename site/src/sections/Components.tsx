import Heading from "src/components/Heading";
import Para from "src/components/Para";
import HiddenSnippet from "src/components/HiddenSnippet";
import {
  autoCompleteSnippet,
  popoversSnippet,
  tooltipSnippet,
} from "src/codeSnippets";
import { Link } from "@adamjanicki/ui";
import { useState } from "react";
import { Autocomplete } from "@adamjanicki/ui-extended";

const fruits = [
  "🍎 Apple",
  "🍌 Banana",
  "🍒 Cherry",
  "🥥 Coconut",
  "🍇 Grape",
  "🥝 Kiwi",
  "🍋 Lemon",
  "🥭 Mango",
  "🍊 Orange",
  "🍑 Peach",
  "🍐 Pear",
  "🍍 Pineapple",
  "🍓 Strawberry",
  "🍉 Watermelon",
];

export default function Components() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <section id="components-section">
      <Heading level={1}>Components</Heading>
      <Para>
        The reason I built this 2nd library in the first place was I had the
        need for more advanced components, specifically ones that rely on
        overlaying components relative to other ones. I needed to make a second
        library to depend on <code>@floating-ui</code> since I wanted to keep my
        original library dependency-free. But my goal is the same: create a set
        of reusable UI elements that look pretty solid and can standardize the
        way my sites look in the future.
        <br />
        <br />
        Below is a list of all components and examples for each; it{" "}
        <em>should</em> be current but no promises, so use at your own risk. The
        point of this library was fun, so I change it often, including terrible
        breaking changes, whatever best serves me and my apps! Now let's get
        into it.
      </Para>
      <Heading level={2}>Autocomplete</Heading>
      <Para>
        The autocomplete component is probably the most complex component I've
        ever built; it's very large: boasting a code footprint of over 300
        lines. I mainly use it to power my search bars and searchable select
        fields on{" "}
        <Link to="https://adamovies.com" target="_blank" rel="noreferrer">
          adamovies.com
        </Link>
        . Check out these examples below on simple and more complex use cases!
      </Para>
      <div className="flex items-center m-auto w-fc flex-wrap">
        <Autocomplete
          filterOption={(option) =>
            option.toLowerCase().includes(value1.toLowerCase())
          }
          value={value1}
          onInputChange={(e) => setValue1(e.target.value)}
          options={fruits}
          onSelect={(value) => setValue1(value)}
          InputProps={{
            className: "bg-white",
            inputProps: { placeholder: "Fruits" },
          }}
          popoverProps={{
            offset: 8,
          }}
        />
      </div>
      <HiddenSnippet>{autoCompleteSnippet}</HiddenSnippet>
      <Heading level={2}>Popover</Heading>
      <Heading level={2}>Tooltip</Heading>
    </section>
  );
}
