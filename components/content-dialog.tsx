import { css } from "@emotion/css";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogTitleProps,
} from "@radix-ui/react-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

const MAX_HEIGHT = "85vh";
const CONTENT_PADDING = 24;

const color = {
  backdrop: "hsla(0, 0%, 0%, 0.4)",
  surface: "#fff",
};

const shadow = {
  small:
    "0 2px 4px 0px rgba(28,28,28,.1), 0 2px 2px -2px rgba(28,28,28,.1), 0 4px 4px -4px rgba(28,28,28,.2)",
  medium:
    "0 2px 4px 0px rgba(28,28,28,.1), 0 8px 8px -4px rgba(28,28,28,.1), 0 12px 12px -8px rgba(28,28,28,.2)",
  large:
    "0 2px 4px 0px rgba(28,28,28,.1), 0 12px 12px -4px rgba(28,28,28,.1), 0 20px 20px -12px rgba(28,28,28,.2)",
};

const contentWidth = {
  xsmall: 400,
  small: 660,
  medium: 940,
  large: 1280,
  xlarge: 1400,
} as const;

type Size = keyof typeof contentWidth;

function pxToRem(value: number | string) {
  const px = typeof value === "string" ? parseFloat(value) : value;

  // NOTE: assume default browser settings of 16px root
  const modifier = 1 / 16;
  return `${px * modifier}rem`;
}

// Dialog Overlay
// ------------------------------
const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, forwardedRef) => {
    return (
      <DialogPrimitive.Overlay {...props} asChild>
        <div
          ref={forwardedRef}
          className={css({
            background: color.backdrop,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          })}
        />
      </DialogPrimitive.Overlay>
    );
  }
);
DialogOverlay.displayName = "DialogOverlay";

// Dialog Content
// ------------------------------
const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps & { size?: Size }
>(({ children, size = "small", ...rest }, forwardedRef) => {
  const gutter = 16;
  return (
    <div
      className={css({
        display: "flex",
        position: "fixed",
        width: "100%",
        top: "50%",
        left: "50%",
        padding: gutter,
        transform: "translate(-50%, -50%)",
        maxHeight: MAX_HEIGHT,
        // Account for padding on left and right so that dialog doesn't go edge-to-edge on mobile
        maxWidth: contentWidth[size] + gutter * 2,
        willChange: "transform",
        zIndex: 3,
        ":focus": {
          // using a transparent outline to ensure focused elements are visible for Windows high contrast mode users.
          outline: "2px solid transparent",
          outlineOffset: "2px",
        },
      })}
    >
      <DialogPrimitive.Content {...rest} asChild>
        <div
          ref={forwardedRef}
          className={css({
            background: color.surface,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            shadow: shadow.large,
            width: "100%",
            maxHeight: MAX_HEIGHT,
          })}
        >
          {children}
        </div>
      </DialogPrimitive.Content>
    </div>
  );
});
DialogContent.displayName = "DialogContent";

// Dialog Wrapper
// ------------------------------
function DialogWrapper({
  children,
  ...rest
}: DialogContentProps & { size?: Size }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogContent {...rest}>{children}</DialogContent>
    </DialogPrimitive.Portal>
  );
}

// Dialog Title
// ------------------------------
function DialogTitle({ children, ...rest }: DialogTitleProps) {
  return (
    <header
      className={css({
        background: color.surface,
        padding: pxToRem(CONTENT_PADDING),
        position: "sticky",
        top: 0,
      })}
    >
      <DialogPrimitive.Title {...rest} asChild>
        <h2>{children}</h2>
      </DialogPrimitive.Title>
    </header>
  );
}

// Dialog Description
// ------------------------------
function DialogDescription({ children, ...rest }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description {...rest} asChild>
      <h3>{children}</h3>
    </DialogPrimitive.Description>
  );
}

// Dialog Close
// ------------------------------
function DialogClose(props: DialogCloseProps) {
  return (
    <DialogPrimitive.Close {...props} asChild>
      <button
        type="button"
        aria-label="Close Dialog"
        className={css({
          background: "green",
          border: "none",
          fontWeight: "bold",
          color: color.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: pxToRem(CONTENT_PADDING / 5),
          borderRadius: 9999,
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 3,
          height: pxToRem(CONTENT_PADDING * 1.25),
          width: pxToRem(CONTENT_PADDING * 1.25),
          cursor: "pointer",
          transform: "translate(33%, -33%)",
        })}
      >
        <span aria-hidden="true">X</span>
      </button>
    </DialogPrimitive.Close>
  );
}

// Content Dialog
// ------------------------------
type ContentDialogProps = {
  children: React.ReactNode;
  size?: Size;
  title: string;
  description?: string;
} & (
  | {
      isOpen: boolean;
      onToggle: () => void;
      trigger?: React.ReactNode;
    }
  | {
      isOpen?: never;
      onToggle?: never;
      trigger: React.ReactNode;
    }
);

export function ContentDialog({
  children,
  trigger,
  title,
  description,
  isOpen,
  onToggle,
  size,
}: ContentDialogProps): JSX.Element {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onToggle}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <DialogWrapper size={size}>
        <DialogClose />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          })}
        >
          <DialogTitle>{title}</DialogTitle>
          <div
            className={css({
              gap: pxToRem(CONTENT_PADDING / 1.5),
              overflow: "auto",
              padding: pxToRem(CONTENT_PADDING),
              marginTop: `-${pxToRem(CONTENT_PADDING)}`,
            })}
          >
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
            {children}
          </div>
        </div>
      </DialogWrapper>
    </DialogPrimitive.Root>
  );
}
