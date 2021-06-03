import React, { RefObject } from 'react';
import { InteractiveProps, InteractiveState } from './Interactive.types';

function applyChildProps(children: React.ReactNode, props: any) {
  const singleChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(singleChild, props);
}

class Interactive extends React.Component<InteractiveProps, InteractiveState> {
  static defaultProps = {
    disabled: true,
  };

  _childRef:
    | RefObject<React.ReactElement>
    | null = null;
  _hoverOutPollTimer:
    | number
    | null = null;
  _removeTouchMoveListener:
    | Function
    | null = null;

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      isFocused: false,
      isPressed: false,
    };
  }

  _handleHoverIn = () => {
    if (!this.state.isHovered) {
      if (this.props.onHoverIn) {
        this.props.onHoverIn();
      }

      this.setState({
        isHovered: true,
      });

      if (typeof Element !== 'undefined' && this._childRef instanceof Element) {
        this._pollForHoverOut(this._childRef);
      }
    }
  }

  _handleHoverOut = () => {
    this._clearPollForHoverOut();

    if (this.state.isHovered) {
      if (this.props.onHoverOut) {
        this.props.onHoverOut();
      }

      this.setState({
        isHovered: false,
      });
    }
  }

  _handleFocus = () => {
    if (!this.state.isFocused) {
      if (this.props.onFocusIn) {
        this.props.onFocusIn();
      }

      this.setState({
        isFocused: true,
      });
    }
  }

  _handleBlur = () => {
    if (this.state.isFocused) {
      if (this.props.onFocusOut) {
        this.props.onFocusOut();
      }

      this.setState({
        isFocused: false,
      });
    }
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
    if (this._removeTouchMoveListener) {
      this._removeTouchMoveListener();
    }

    if (this.state.isPressed) {
      if (this.props.onPressOut) {
        this.props.onPressOut();
      }

      this.setState({
        isPressed: false,
      });
    }
  }

  _handleTouchStart = () => {
    this._addTouchMoveListener();
    this._handlePressDown();
  }

  _handleTouchEnd = () => {
    this._handlePressUp();
  }

  _handleMouseDown = () => {
    this._handlePressDown();
  }

  _handleMouseUp = () => {
    this._handlePressUp();
  }

  _handleMouseEnter = () => {
    this._handleHoverIn();
  }

  _handleMouseLeave = () => {
    this._handlePressUp();
    this._handleHoverOut();
  }

  _addTouchMoveListener() {
    document.addEventListener('touchmove', this._handlePressUp, {
      passive: true,
    });

    this._removeTouchMoveListener = () => {
      document.removeEventListener('touchmove', this._handlePressUp);
    };
  }

  _pollForHoverOut(el: Element) {
    this._hoverOutPollTimer = setTimeout(() => {
      if (el.matches(':hover')) {
        this._pollForHoverOut(el);
      }
      else {
        this._handleHoverOut();
      }
    }, 100);
  }

  _clearPollForHoverOut() {
    if (this._hoverOutPollTimer) {
      clearTimeout(this._hoverOutPollTimer);
      this._hoverOutPollTimer = null;
    }
  }

  _setChildRef = (ref: RefObject<React.ReactElement>) => {
    this._childRef = ref;
  }

  componentWillUnmount() {
    if  (this._removeTouchMoveListener) {
      this._removeTouchMoveListener();
    }

    this._clearPollForHoverOut();
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

    return applyChildProps(child, {
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      onMouseOver: this._handleMouseEnter,
      onMouseDown: this._handleMouseDown,
      onMouseLeave: this._handleMouseLeave,
      onMouseUp: this._handleMouseUp,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      ref: this._setChildRef,
    });
  }
}

export default Interactive;
