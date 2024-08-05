import { cloneElement, useState } from "react";
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

type Props = {
  /**
   * Children to render inside the tooltip container.
   */
  tooltipContent: React.ReactNode | React.ReactNode[];
  /**
   * The element to attach the tooltip to.
   * **IMPORTANT**: This must be able to hold a ref.
   */
  children: React.ReactElement;
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
};

const Tooltip = (props: Props) => {
  const {
    children,
    tooltipContent: content,
    placement = "bottom",
    style,
    offset: placementOffset = 0,
    className,
    disableFlip = false,
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
    duration: 250, // default ajui-transition value
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{ ...(style || {}), ...floatingStyles, ...transitionStyles }}
          {...getFloatingProps()}
          className={className}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
