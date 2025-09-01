import React from "react";
import Box, { BoxProps } from "@adamjanicki/ui/components/Box/Box";
import {
  useFloating,
  autoUpdate,
  type Placement,
  offset,
  useDismiss,
  useTransitionStyles,
} from "@floating-ui/react";

type Props = BoxProps & {
  /**
   * The trigger ref for the element to position the popover over.
   */
  triggerRef: React.RefObject<HTMLElement | null>;
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
   * @default false
   */
  returnFocusOnEscape?: boolean;
};

export const UnstyledPopover = (props: Props) => {
  const {
    triggerRef,
    open,
    placement = "bottom",
    style,
    offset: placementOffset = 0,
    children,
    onClose,
    returnFocusOnEscape = false,
    ...rest
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

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 0, close: 250 }, // default aui-transition value
  });

  useDismiss(context, { bubbles: false });

  return isMounted ? (
    <Box
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        ...transitionStyles,
        ...style,
      }}
      {...rest}
    >
      <>{children}</>
    </Box>
  ) : null;
};

const Popover = ({ vfx, ...rest }: Props) => (
  <UnstyledPopover
    vfx={{
      padding: "s",
      backgroundColor: "default",
      border: true,
      shadow: "floating",
      radius: "rounded",
      z: "floating",
      ...vfx,
    }}
    {...rest}
  />
);

export default Popover;
