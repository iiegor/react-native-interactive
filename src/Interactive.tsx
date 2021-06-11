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
    const { isPressed } = this.state;

    let child = children;
    if (typeof child === 'function') {
      child = child({
        isHovered: false,
        isFocused: false,
        isPressed: !disabled && isPressed,
      });
    }

    const singleChild = React.Children.only(child);
    return (
      <Pressable
        onPressIn={this._handlePressDown}
        onPressOut={this._handlePressUp}
        children={singleChild}
      />
    );
  }
}

export default Interactive;
