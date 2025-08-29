import React, { cloneElement, useState } from "react";
import Box, { BoxProps } from "@adamjanicki/ui/components/Box/Box";
import {
  useFloating,
  useHover,
  useInteractions,
  flip,
  safePolygon,
  autoUpdate,
  offset,
  type Placement,
  useTransitionStyles,
} from "@floating-ui/react";
import { classNames } from "@adamjanicki/ui";

type Props = Omit<BoxProps, "children" | "onMouseEnter" | "onMouseLeave"> & {
  /**
   * Children to render inside the tooltip container.
   */
  tooltipContent: React.ReactNode | React.ReactNode[];
  /**
   * The element to attach the tooltip to.
   * **IMPORTANT**: This must be able to hold a ref.
   */
  children: React.ReactElement<any>;
  /**
   * The placement of the popover relative to the trigger element.
   * @default "bottom"
   */
  placement?: Placement;
  /**
   * The offset of the popover relative to the trigger element.
   * @default 0
   */
  offset?: number;
  /**
   * Whether to disable the flip behavior of the tooltip.
   */
  disableFlip?: boolean;
  /**
   * Whether the tooltip is disabled. If true, will not show the tooltip.
   * @default false
   */
  disabled?: boolean;
};

export const UnstyledTooltip = (props: Props) => {
  const {
    children,
    tooltipContent: content,
    placement = "bottom",
    style,
    offset: placementOffset = 0,
    disableFlip = false,
    disabled = false,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const middleware = [offset(placementOffset)];
  if (!disableFlip) {
    middleware.push(flip());
  }

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware,
    whileElementsMounted: autoUpdate,
    placement,
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
    mouseOnly: true,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 250, // default aui-transition value
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  if (disabled) return children;

  const { onMouseEnter, onMouseLeave } = getFloatingProps();

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {isMounted && (
        <Box
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...transitionStyles, ...style }}
          {...({ onMouseEnter, onMouseLeave } as any)}
          {...rest}
        >
          <>{content}</>
        </Box>
      )}
    </>
  );
};

export const Tooltip = ({ className, layout, ...rest }: Props) => (
  <UnstyledTooltip
    className={classNames("aui-tooltip", className)}
    layout={{ padding: "s", ...layout }}
    {...rest}
  />
);

export default Tooltip;
