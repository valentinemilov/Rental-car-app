/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InputForm from './form';

configure({ adapter: new Adapter() });

const obj = {};
const err = {};

describe('InputForm component', () => {
  it('Should call onInputChanged() when firstName input field is changed', () => {
    const mockHandler = jest.fn();

    const component = mount(<InputForm onInputChanged={mockHandler} contract={obj} errors={err} />);
    const input = component.find('input').at(0);
    const eventMock = { target: { value: 'testOne', getAttribute: () => 'test' } };

    input.simulate('change', eventMock);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith('test', 'testOne');

    mockHandler.mockClear();
  });

  it('Should call onInputChanged() when lastName input field is changed', () => {
    const mockHandler = jest.fn();

    const component = mount(<InputForm onInputChanged={mockHandler} contract={obj} errors={err} />);
    const input = component.find('input').at(1);
    const eventMock = { target: { value: 'testOne', getAttribute: () => 'test' } };

    input.simulate('change', eventMock);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith('test', 'testOne');

    mockHandler.mockClear();
  });

  it('Should have length of 4 input fields', () => {
    const mockHandler = jest.fn();

    const component = mount(<InputForm onInputChanged={mockHandler} contract={obj} errors={err} />);
    expect(component.find('input')).toHaveLength(4);

    mockHandler.mockClear();
  });
});
