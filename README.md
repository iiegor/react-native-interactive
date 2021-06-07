# rn-interactive

[![npm](https://img.shields.io/npm/dm/rn-interactive?label=npm)](https://www.npmjs.com/package/rn-interactive) [![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/rn-interactive?color=green)](https://bundlephobia.com/result?p=react-interactive) ![npm type definitions](https://img.shields.io/npm/types/rn-interactive?color=blue)

> Handle interactions with your components effectively across platforms

- Consistent API across desktop and touch devices
- DOM events handled by React
- Only `932 bytes` gzipped

## Installation

```shell
npm install rn-interactive
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
            isHovered && styles.hovered,
            isFocused && styles.focused,
            isPressed && styles.pressed,
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

Create an Interactive component

Props | Type | Description
--- | --- | ---
children | `Element` or `Function` | Element or callback providing the current state.
disabled | `boolean` | Prevents the interaction when enabled. Default to `false`.
onHoverIn | `function` | Callback when the element is `hovered`.
onHoverOut | `function` | Callback when the element loses the `hovered` state.
onPressIn | `function` | Callback when the element is `pressed`.
onPressOut | `function` | Callback when the element loses the `pressed` state.
onFocusIn | `function` | Callback when the element is `focused`.
onFocusOut | `function` | Callback when the element loses the `focused` state.
