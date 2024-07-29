import React from "react";
import Popover from "../Popover/Popover";
import ClickOutside from "@adamjanicki/ui/components/ClickOutside";
import { IconInput } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/utils/util";

interface Props<T> {
  /**
   * The value of the input field
   */
  value: string;
  /**
   * Callback for when the input field changes
   * @param event standard React ChangeEvent
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback for when an option is selected
   * @param value selected value
   */
  onSelect: (value: T) => void;
  /**
   * The list of available options
   */
  options: T[] | readonly T[];
  /**
   * Predicate to filter options
   * @param option current option
   * @returns true if the option should be displayed
   */
  filterOption?: (option: T) => boolean;
  /**
   * Render function for the option
   * @param option current option
   * @returns node to render for the option
   */
  renderOption?: (option: T) => React.ReactNode;
  /**
   * Node to render when no options are available
   */
  noOptionsNode?: React.ReactNode;
  /**
   * Classname to apply to the root element
   */
  className?: string;
  /**
   * Style to apply to the root element
   */
  style?: React.CSSProperties;
  /**
   * Group options by a string
   * @param option current option
   * @returns String to group by
   */
  groupBy?: (option: T) => string;
  /**
   * Render function for the group
   * @param group name
   * @returns node to render for the group
   */
  renderGroup?: (group: string) => React.ReactNode;
  /**
   * Allow free text input
   */
  freeSolo?: boolean;
  /**
   * Focus on the input field after selecting an option
   */
  focusOnSelect?: boolean;
  /**
   * Props for the input field
   */
  InputProps?: React.ComponentProps<typeof IconInput>;
  /**
   * Props for the popover
   */
  popoverProps?: Partial<React.ComponentProps<typeof Popover>>;
  /**
   * Props for the list element
   */
  listProps?: React.ComponentProps<"ul">;
  /**
   * Props for the list item elements
   */
  listItemProps?: React.ComponentProps<"li">;
  /**
   * Footer node to render at the bottom of the popover
   */
  footer?: React.ReactNode;
}

const defaultRenderOption = <T,>(option: T) => (
  <div className="ajui-autocomplete-default-rendering">{`${option}`}</div>
);

const Autocomplete = <T,>(props: Props<T>) => {
  const {
    options,
    renderOption = defaultRenderOption,
    filterOption = () => true,
    groupBy,
    renderGroup,
    noOptionsNode,
    InputProps = {},
    freeSolo = false,
    focusOnSelect = true,
    value,
    onInputChange,
    onSelect,
    popoverProps,
    footer,
    listItemProps = {},
    listProps = {},
    ...rest
  } = props;

  const onRef = React.useRef<HTMLLIElement>(null);
  const nextRef = React.useRef<HTMLElement>(null);
  const prevRef = React.useRef<HTMLElement>(null);

  const [on, setOn] = React.useState<number>();
  let filteredOptions = options.filter(filterOption);
  const groupMap = new Map<number, string>();
  if (groupBy) {
    const uniqueGroups: string[] = [];
    filteredOptions.forEach((option) => {
      const group = groupBy(option);
      if (!uniqueGroups.includes(group)) {
        uniqueGroups.push(group);
      }
    });
    let offset = 0;
    filteredOptions = uniqueGroups
      .map((group) => {
        const filtered = filteredOptions.filter(
          (option) => groupBy(option) === group
        );
        groupMap.set(offset, group);
        offset += filtered.length;
        return filtered;
      })
      .flat();
  }
  if (freeSolo && value.length > 0 && filteredOptions.length === 0) {
    filteredOptions.push(value as T);
  }

  const handleChange = (v: T) => {
    onSelect(v);
    const { current } = inputRef;
    closeMenu();
    if (focusOnSelect) return current?.focus();
  };

  const closeMenu = () => {
    setOn(undefined);
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

  const handleKeys = ({ code }: React.KeyboardEvent<HTMLDivElement>) => {
    if (code === "Escape") {
      closeMenu();
    }
    const modulo = filteredOptions.length;
    if (code === "Enter") {
      const { current } = onRef;
      if (modulo > 0 && current) {
        return current.click();
      }
    }
    if (modulo > 0 && code === "ArrowDown") {
      const newOn = ((on !== undefined ? on : -1) + 1) % modulo;
      setOn(newOn);
      if (nextRef.current) {
        nextRef.current.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    } else if (modulo > 0 && code === "ArrowUp") {
      const newOn = ((on !== undefined ? on : 0) - 1 + modulo) % modulo;
      setOn(newOn);
      if (prevRef.current) {
        prevRef.current.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  };

  const [open, setOpen] = React.useState(false);

  const inputContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const popoverOpen = open && (filteredOptions.length > 0 || value.length > 0);

  return (
    <ClickOutside onClickOutside={closeMenu}>
      <div {...rest} onKeyUp={(e) => handleKeys(e)}>
        <IconInput
          {...InputProps}
          ref={inputContainerRef as any}
          inputProps={{
            ...(InputProps.inputProps || {}),
            value,
            onChange: (e) => {
              setOn(undefined);
              onInputChange(e);
              if (e.target.value) {
                !open && openMenu();
              } else {
                const { current } = inputRef;
                current && current.focus();
              }
            },
            onClick: () => {
              !open && openMenu();
            },
            ref: inputRef,
            autoComplete: "off",
          }}
        />
        <Popover
          {...popoverProps}
          open={popoverOpen}
          triggerRef={inputContainerRef}
          style={{
            zIndex: 100,
            ...(popoverProps?.style || {}),
            padding: 0,
            margin: 0,
            width: inputContainerRef.current?.offsetWidth ?? 0,
          }}
          className="ajui-autocomplete-popover"
        >
          <ul
            {...listProps}
            className={classNames("ajui-autocomplete-ul", listProps.className)}
          >
            {filteredOptions.length
              ? filteredOptions.map((option, index) => {
                  const group = groupMap.get(index);
                  return (
                    <React.Fragment key={index}>
                      {group && (renderGroup?.(group) || group)}
                      <li
                        {...listItemProps}
                        ref={on === index ? onRef : null}
                        onMouseEnter={() => setOn(index)}
                        className={classNames(
                          `ajui-autocomplete-li`,
                          on === index
                            ? "ajui-autocomplete-on-option"
                            : undefined,
                          listItemProps.className
                        )}
                        onClick={() => handleChange(option)}
                      >
                        {renderOption(option)}
                      </li>
                    </React.Fragment>
                  );
                })
              : !freeSolo &&
                (noOptionsNode || defaultRenderOption("No results found"))}
          </ul>
          {footer}
        </Popover>
      </div>
    </ClickOutside>
  );
};

export default Autocomplete;
