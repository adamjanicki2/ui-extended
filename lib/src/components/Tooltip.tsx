import React, { cloneElement, useState } from "react";
import { Box } from "@adamjanicki/ui";
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

type Props<T extends React.ElementType> = {
  /**
   * Children to render inside the tooltip container.
   */
  tooltipContent: React.ReactNode | React.ReactNode[];
  /**
   * The element to attach the tooltip to.
   * **IMPORTANT**: This must be able to hold a ref.
   */
  children: React.ReactElement<React.ComponentPropsWithRef<T>>;
  /**
   * The placement of the popover relative to the trigger element.
   * @default "bottom"
   */
  placement?: Placement;
  /**
   * Additional styles to apply to the tooltip container.
   */
  style?: React.CSSProperties;
  /**
   * Additional classes to apply to the tooltip container.
   */
  className?: string;
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

const Tooltip = <T extends React.ElementType>(props: Props<T>) => {
  const {
    children,
    tooltipContent: content,
    placement = "bottom",
    style,
    offset: placementOffset = 0,
    className,
    disableFlip = false,
    disabled = false,
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
      } as any)}
      {isMounted && (
        <Box
          ref={refs.setFloating}
          style={{ ...style, ...floatingStyles, ...transitionStyles }}
          {...({ onMouseEnter, onMouseLeave } as any)}
          className={className}
        >
          <>{content}</>
        </Box>
      )}
    </>
  );
};

export default Tooltip;
