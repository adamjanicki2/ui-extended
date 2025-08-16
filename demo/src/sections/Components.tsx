import Heading from "src/components/Heading";
import Para from "src/components/Para";
import HiddenSnippet from "src/components/HiddenSnippet";
import {
  autoCompleteSnippet,
  popoversSnippet,
  tooltipSnippet,
} from "src/codeSnippets";
import { Button, Link, UnstyledButton } from "@adamjanicki/ui";
import { useRef, useState } from "react";
import { Autocomplete, Popover, Tooltip } from "@adamjanicki/ui-extended";

const fruits = [
  "Apple 🍎",
  "Banana 🍌",
  "Cherry 🍒",
  "Coconut 🥥",
  "Grape 🍇",
  "Kiwi 🥝",
  "Lemon 🍋",
  "Mango 🥭",
  "Orange 🍊",
  "Peach 🍑",
  "Pear 🍐",
  "Pineapple 🍍",
  "Strawberry 🍓",
  "Watermelon 🍉",
];

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

type Title = {
  type: "movie" | "show";
  title: string;
  year: number;
  rating: number;
};

const titles: Title[] = [
  {
    title: "Alien",
    year: 1979,
    type: "movie",
    rating: 95,
  },
  {
    title: "Andor",
    year: 2022,
    type: "show",
    rating: 92,
  },
  {
    title: "Breaking Bad",
    year: 2008,
    type: "show",
    rating: 89,
  },
  {
    title: "Inception",
    year: 2010,
    type: "movie",
    rating: 90,
  },
  {
    title: "Jackie Brown",
    year: 1997,
    type: "movie",
    rating: 65,
  },
  {
    title: "Mr. Robot",
    year: 2015,
    type: "show",
    rating: 93,
  },
  {
    title: "North by Northwest",
    year: 1959,
    type: "movie",
    rating: 82,
  },
  {
    title: "Pacific Rim",
    year: 2013,
    type: "movie",
    rating: 72,
  },
  {
    title: "The Shining",
    year: 1980,
    type: "movie",
    rating: 80,
  },
  {
    title: "To Catch a Thief",
    year: 1955,
    type: "movie",
    rating: 83,
  },
];

export default function Components() {
  const [popoverOpen1, setPopoverOpen1] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);

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
      <div className="flex items-center flex-wrap justify-center">
        <Autocomplete
          className="ma1"
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
        <Autocomplete
          className="ma1"
          value={value2}
          onInputChange={(e) => setValue2(e.target.value)}
          options={titles}
          filterOption={(option) =>
            option.title.toLowerCase().includes(value2.toLowerCase())
          }
          onSelect={(value) => setValue2(value.title)}
          groupBy={(option) => option.type}
          renderGroup={(group) => (
            <div className="mh2 mv1 fw7">{capitalize(group)}s</div>
          )}
          renderOption={(option) => (
            <div className="pa2">
              <span className="fw6">{option.title}</span>
              <div className="dark-gray fw5 f6">
                {option.year} | {option.rating}%
              </div>{" "}
            </div>
          )}
          InputProps={{
            startIcon: <span className="ml2">🎬</span>,
            className: "bg-white",
            inputProps: { placeholder: "Reviews" },
          }}
          popoverProps={{
            offset: 8,
          }}
        />
      </div>
      <HiddenSnippet>{autoCompleteSnippet}</HiddenSnippet>
      <Heading level={2}>Popover</Heading>
      <Para>
        The popover component serves as a foundational component for overlaying
        a layer on top of another object while not shifting down any page
        content. It's mounted such that it floats over the rest of the page. In
        fact, this popover component is what powers the autocomplete component
        that we just looked at above!
      </Para>
      <div className="flex items-center flex-wrap justify-center">
        <Button
          ref={ref1}
          className="ma1"
          onClick={() => setPopoverOpen1(!popoverOpen1)}
        >
          Toggle popover
        </Button>
        <Popover
          triggerRef={ref1}
          open={popoverOpen1}
          onClose={() => setPopoverOpen1(false)}
        >
          <div className="pa3 bg-white br3 fade">I'm a popover!</div>
        </Popover>
        <Button
          ref={ref2}
          className="ma1"
          variant="secondary"
          onClick={() => setPopoverOpen2(!popoverOpen2)}
        >
          Open menu
        </Button>
        <Popover
          triggerRef={ref2}
          open={popoverOpen2}
          className="fade bg-white b--moon-gray ba aui-corners--rounded pa1 flex flex-column"
          onClose={() => setPopoverOpen2(false)}
          returnFocusOnEscape={false}
          placement="bottom-start"
          offset={8}
        >
          <UnstyledButton className="pa3 br3 aui-autocomplete-option">
            Menu Item 1
          </UnstyledButton>
          <UnstyledButton className="pa3 br3 aui-autocomplete-option">
            Menu Item 2
          </UnstyledButton>
          <UnstyledButton className="pa3 br3 aui-autocomplete-option">
            Menu Item 3
          </UnstyledButton>
        </Popover>
      </div>
      <HiddenSnippet>{popoversSnippet}</HiddenSnippet>
      <Heading level={2}>Tooltip</Heading>
      <Para>
        The tooltip component is a simple component that shows a tooltip when
        hovering over an element. It's a simple component but can be very
        useful, especially when you need to show more information about an
        element without taking up too much space in your main UI. Check out the
        examples below!
      </Para>
      <div className="flex items-center flex-wrap justify-center">
        <Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="left">
          <div className="pa2 ma1 br2 white bg-dark-red">Left</div>
        </Tooltip>
        <Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="top">
          <div className="pa2 ma1 br2 white bg-dark-green">Top</div>
        </Tooltip>
        <Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="bottom">
          <div className="pa2 ma1 br2 white bg-blue">Bottom</div>
        </Tooltip>
        <Tooltip tooltipContent="I'm a tooltip!" offset={2} placement="right">
          <div className="pa2 ma1 br2 white bg-purple">Right</div>
        </Tooltip>
      </div>
      <HiddenSnippet>{tooltipSnippet}</HiddenSnippet>
    </section>
  );
}
