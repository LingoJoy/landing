import { ComponentType, FC, TouchEvent } from "react";

const withKeyboardDismiss = <P extends object>(Component: ComponentType<P>) => {
  const WithKeyboardDismiss: FC<P> = (props) => {
    const handleCloseKeyboard = (event: TouchEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;

      if (!target.closest("input, textarea")) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    return (
      <div onTouchEnd={handleCloseKeyboard}>
        <Component {...props} />
      </div>
    );
  };

  return WithKeyboardDismiss;
};

export default withKeyboardDismiss;