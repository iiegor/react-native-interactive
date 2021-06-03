import React from 'react';
import { Pressable } from 'react-native';
import { InteractiveProps, InteractiveState } from './Interactive.types';

class Interactive extends React.Component<InteractiveProps, InteractiveState> {
  static defaultProps = {
    disabled: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      isFocused: false,
      isPressed: false,
    };
  }

  _handlePressDown = () => {
    if (this.props.onPressIn) {
      this.props.onPressIn();
    }

    this.setState({
      isPressed: true,
    });
  }

  _handlePressUp = () => {
    if (this.state.isPressed) {
      if (this.props.onPressOut) {
        this.props.onPressOut();
      }

      this.setState({
        isPressed: false,
      });
    }
  }

  render() {
    const { children, disabled } = this.props;
    const { isHovered, isFocused, isPressed } = this.state;

    let child = children;
    if (typeof child === 'function') {
      child = child({
        isHovered: !disabled && isHovered,
        isFocused: !disabled && isFocused,
        isPressed: !disabled && isPressed,
      });
    }

    return (
      <Pressable
        onPressIn={this._handlePressDown}
        onPressOut={this._handlePressUp}
        children={child}
      />
    );
  }
}

export default Interactive;
