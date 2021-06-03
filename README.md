# rn-interactive

[![npm](https://img.shields.io/npm/dm/rn-interactive?label=npm)](https://www.npmjs.com/package/rn-interactive) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/rn-interactive?color=green)](https://bundlephobia.com/result?p=react-interactive) ![npm type definitions](https://img.shields.io/npm/types/rn-interactive?color=blue)

> Handle interactions with your component effectively across platforms

- Consistent API across desktop and touch devices
- Only `932 bytes` gzipped

## Installation

```shell
$ npm install rn-interactive
```

## Usage example

```jsx
import { Interactive } from 'rn-interactive';

function Button({ disabled = false }) {
  return (
    <Interactive disabled={disabled}>
      {({ isHovered, isFocused, isPressed }) => (
        <View
          accessibilityRole="button"
          accessible={!disabled}
          style={[
            styles.button,
            isHovered && styles.hover,
            isFocused && styles.focus,
            isPressed && styles.active,
            disabled && styles.disabled,
          ]}
        >
          <Text>{title}</Text>
        </View>
      )}
    </Interactive>
  );
}
```

## API

### Interactive

Creates an Interactive component

Props | Type | Description
--- | --- | ---
disabled | boolean | Indicates if the element is interactable. Default to `false`.
onHoverIn | function | The element gets hovered.
onHoverOut | function | The element loses the hover state.
onPressIn | function | The element gets pressed.
onPressOut | function | The element loses the press state.
onFocusIn | function | The element gets focused in.
onFocusOut | function | The element loses the focus state.
