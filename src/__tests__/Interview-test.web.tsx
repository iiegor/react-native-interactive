import { mount } from 'enzyme';
import React from 'react';

import { Interactive } from '../';

describe('Interactive web', () => {
  it('should render as expected', () => {
    const component = mount(
      <Interactive>
        <button>I'm a button</button>
      </Interactive>
    );

    expect(component.first()).toMatchSnapshot();
  });

  it('handles mouseover and mouseleave events', () => {
    const onHoverIn = jest.fn();
    const onHoverOut = jest.fn();

    const component = mount(
      <Interactive onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
        <button>I'm a button</button>
      </Interactive>
    );

    expect(component.state('isHovered')).toBeFalsy();

    component.find('button').simulate('mouseover');
    expect(component.state('isHovered')).toBeTruthy();

    component.find('button').simulate('mouseleave');
    expect(component.state('isHovered')).toBeFalsy();

    expect(onHoverIn).toHaveBeenCalledTimes(1);
    expect(onHoverOut).toHaveBeenCalledTimes(1);
  });

  it('handles focus and blur events', () => {
    const onFocusIn = jest.fn();
    const onFocusOut = jest.fn();

    const component = mount(
      <Interactive onFocusIn={onFocusIn} onFocusOut={onFocusOut}>
        <button>I'm a button</button>
      </Interactive>
    );

    expect(component.state('isFocused')).toBeFalsy();

    component.find('button').simulate('focus');
    expect(component.state('isFocused')).toBeTruthy();

    component.find('button').simulate('blur');
    expect(component.state('isFocused')).toBeFalsy();

    expect(onFocusIn).toHaveBeenCalledTimes(1);
    expect(onFocusOut).toHaveBeenCalledTimes(1);
  });

  it('handles mousedown and mouseup events', () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();

    const component = mount(
      <Interactive onPressIn={onPressIn} onPressOut={onPressOut}>
        <button>I'm a button</button>
      </Interactive>
    );

    expect(component.state('isPressed')).toBeFalsy();

    component.find('button').simulate('mousedown');
    expect(component.state('isPressed')).toBeTruthy();

    component.find('button').simulate('mouseup');
    expect(component.state('isPressed')).toBeFalsy();

    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });
});
