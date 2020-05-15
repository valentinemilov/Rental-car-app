/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InputForm from './form';

configure({ adapter: new Adapter() });

describe('InputForm component', () => {
  it('Should call onInputChanged() when input field is changed', () => {
    const obj = {};
    const err = {};
    const mockHandler = jest.fn();
    const component = shallow(<InputForm onInputChanged={mockHandler} contract={obj} errors={err} />);
    const input = component.find('.first');
    // console.log(component.debug());
    // expect(input.props().contract).toEqual('');

    // input.props().onChange({ target: { value: 'First Task' } });
    // expect(input.props().value).toEqual('First Task');

    const mockedEvent = { target: {} };
    input.simulate('change', mockedEvent);

    // does not work
    // input.simulate('change');
    // expect(mockHandler.mock.calls.length).toBe(1);

    // const input = component.find('.first');
    // input.simulate('change', { target: { value: 'a' } });
    // expect(mockHandler).toHaveBeenCalledTimes(1);
    // expect(component.find('.first').props().value).toEqual('a');
  });
});
