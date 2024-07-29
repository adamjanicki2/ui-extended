import React from "react";
import {
  useFloating,
  autoUpdate,
  type Placement,
  offset,
  useDismiss,
} from "@floating-ui/react";

type Props = {
  /**
   * Children to render inside the popover.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * The trigger ref for the element to position the popover over.
   */
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * Whether the popover is open.
   */
  open: boolean;
  /**
   * The placement of the popover relative to the trigger element.
   * @default "bottom"
   */
  placement?: Placement;
  /**
   * Additional styles to apply to the popover container.
   */
  style?: React.CSSProperties;
  /**
   * Additional classes to apply to the popover container.
   */
  className?: string;
  /**
   * The offset of the popover relative to the trigger element.
   * @default 0
   */
  offset?: number;
  /**
   * Callback function to execute when the popover is closed.
   */
  onClose?: () => void;
  /**
   * Whether to return focus to the trigger element when the popover is closed
   * by pressing the escape key.
   */
  returnFocusOnEscape?: boolean;
};

const Popover = (props: Props) => {
  const {
    triggerRef,
    open,
    placement = "bottom",
    style,
    offset: placementOffset = 0,
    className,
    children,
    onClose,
    returnFocusOnEscape = true,
  } = props;

  const handleOnClose = () => {
    if (!returnFocusOnEscape) triggerRef.current?.blur?.();
    onClose?.();
  };

  const middleware = [offset(placementOffset)];

  const { floatingStyles, context, refs } = useFloating({
    elements: { reference: triggerRef.current },
    open,
    onOpenChange: (open) => {
      if (!open) handleOnClose();
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware,
  });

  useDismiss(context);
  if (!open) return null;

  return (
    <div
      ref={refs.setFloating}
      style={{ ...(style || {}), ...floatingStyles, outline: "none" }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Popover;
