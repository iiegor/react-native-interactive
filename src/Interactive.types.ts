import React from 'react';

export type InteractiveState = Partial<{
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
}>;

export type InteractiveProps = {
  children:
    | React.ReactElement
    | (({ isHovered, isFocused, isPressed }: InteractiveState) => React.ReactElement);
  disabled?: boolean;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
};
