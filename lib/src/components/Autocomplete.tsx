import React from "react";
import Popover from "./Popover";
import { Box, ClickOutside, IconInput, ui } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";

type Props<T> = {
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
  listProps?: React.ComponentProps<typeof ui.ul>;
  /**
   * Props for the list item elements
   */
  listItemProps?: React.ComponentProps<typeof ui.li>;
  /**
   * Footer node to render at the bottom of the popover
   */
  footer?: React.ReactNode;
  /**
   * Close the popover when the footer is clicked
   * @default true
   */
  closeOnFooterClick?: boolean;
  /**
   * A callback to be called when the user hits the enter key while no option is selected
   */
  onUnselectedEnter?: () => void;
  /**
   * Whether or not to leave the popover open after a selection occurs
   * @default false
   */
  remainOpenOnSelectOrEnter?: boolean;
};

const defaultRenderOption = <T,>(option: T) => (
  <Box vfx={{ padding: "s" }}>{`${option}`}</Box>
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
    value,
    onInputChange,
    onSelect,
    popoverProps,
    footer,
    listItemProps = {},
    listProps = {},
    onUnselectedEnter,
    closeOnFooterClick = true,
    remainOpenOnSelectOrEnter = false,
    ...rest
  } = props;

  const inputContainerRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const onRef = React.useRef<HTMLLIElement | null>(null);

  const [on, setOn] = React.useState<number>();
  const [open, setOpen] = React.useState(false);

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

  const focusInput = () => inputRef.current?.focus();

  const handleChange = (v: T) => {
    onSelect(v);
    if (!remainOpenOnSelectOrEnter) closeMenu();
  };

  const closeMenu = () => {
    setOn(undefined);
    setOpen(false);
    inputRef.current?.blur();
  };
  const openMenu = () => setOpen(true);

  const handleKeys = ({ code }: React.KeyboardEvent<HTMLDivElement>) => {
    if (code === "Escape") {
      closeMenu();
    }
    const modulo = filteredOptions.length;
    if (modulo <= 0) {
      return;
    }
    if (code === "Enter") {
      const { current } = onRef;
      if (current) {
        // Horrible heuristic to handle links
        // It's terrible, but efficient
        const child = current.firstChild as HTMLElement;
        if (child && child.nodeName === "A") child.click?.();
        current.click();
      } else if (onUnselectedEnter) {
        onUnselectedEnter();
        if (!remainOpenOnSelectOrEnter) closeMenu();
      }
    }
    if (code === "ArrowDown") {
      setOn((on) => ((on ?? -1) + 1) % modulo);
    } else if (code === "ArrowUp") {
      setOn((on) => ((on ?? 0) - 1 + modulo) % modulo);
    }
  };

  React.useEffect(() => {
    onRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [on]);

  const popoverOpen = open && (filteredOptions.length > 0 || value.length > 0);

  return (
    <ClickOutside onClickOutside={closeMenu}>
      <Box {...rest} onKeyUp={(e) => handleKeys(e)}>
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
                if (!open) {
                  openMenu();
                }
              } else {
                focusInput();
              }
            },
            onClick: () => {
              if (!open) {
                openMenu();
              }
            },
            ref: inputRef,
            autoComplete: "off",
          }}
        />
        <Popover
          {...popoverProps}
          open={popoverOpen}
          triggerRef={inputContainerRef}
          vfx={{
            padding: "none",
            margin: "none",
            overflow: "hidden",
            fontWeight: 4,
          }}
          style={{
            ...popoverProps?.style,
            width: inputContainerRef.current?.offsetWidth ?? 0,
          }}
        >
          <ui.ul
            {...listProps}
            vfx={{
              axis: "y",
              padding: "s",
              margin: "none",
              overflow: "scroll",
              ...listProps.vfx,
            }}
            style={{ maxHeight: 300, ...listProps.style }}
            tabIndex={-1}
          >
            <>
              {filteredOptions.length
                ? filteredOptions.map((option, index) => {
                    const group = groupMap.get(index);
                    const ref = index === on ? onRef : undefined;

                    return (
                      <React.Fragment key={index}>
                        {group && (renderGroup?.(group) || group)}
                        <ui.li
                          {...listItemProps}
                          vfx={{
                            axis: "x",
                            cursor: "pointer",
                            radius: "rounded",
                            ...listItemProps.vfx,
                          }}
                          ref={ref}
                          onMouseEnter={() => setOn(index)}
                          className={classNames(
                            on === index
                              ? "aui-autocomplete-on-option"
                              : undefined,
                            listItemProps.className
                          )}
                          onClick={() => handleChange(option)}
                        >
                          <>{renderOption(option)}</>
                        </ui.li>
                      </React.Fragment>
                    );
                  })
                : !freeSolo &&
                  (noOptionsNode || defaultRenderOption("No results found"))}
            </>
          </ui.ul>
          {!!footer && (
            <Box onClick={closeOnFooterClick ? closeMenu : undefined}>
              <>{footer}</>
            </Box>
          )}
        </Popover>
      </Box>
    </ClickOutside>
  );
};

export default Autocomplete;
