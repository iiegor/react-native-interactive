import { mount } from 'enzyme';
import React from 'react';

import { Interactive } from '../';

describe('Interactive native', () => {
  it('should render as expected', () => {
    const component = mount(
      <Interactive>
        <button>I'm a button</button>
      </Interactive>
    );

    expect(component.first()).toMatchSnapshot();
  });

  it('handles press in and press out events', () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();

    const component = mount(
      <Interactive onPressIn={onPressIn} onPressOut={onPressOut}>
        <button>I'm a button</button>
      </Interactive>
    );

    const pressable = component.first().children().props();

    pressable.onPressIn();
    expect(component.state('isPressed')).toBeTruthy();

    pressable.onPressOut();
    expect(component.state('isPressed')).toBeFalsy();

    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });
});
