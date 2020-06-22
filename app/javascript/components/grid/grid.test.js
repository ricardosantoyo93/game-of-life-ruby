import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { Grid } from './grid';
import Adapter from 'enzyme-adapter-react-16';
import styled from 'styled-components'
import { enzymeFind, findAll } from 'styled-components/test-utils'
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });

describe('Grid Component', () => {
    const grid = [
        [true]
    ];

    test('renders', () => {
        const wrapper = shallow(<Grid run={false} grid={grid} />);
        expect(wrapper.exists()).toBe(true);
    });

    test('buttons are disabled', () => {
        const wrapper = shallow(<Grid run={true} grid={grid} />);
        expect(wrapper.find('#randomizer').prop('disabled')).toBe(true);
    });

    test('setNewGrid was called', () => {
        const setNewGrid = jest.fn();
        const wrapper = shallow(<Grid run={false} grid={grid} setNewGrid={setNewGrid} />);
        wrapper.find('#randomizer').simulate('click');
        expect(setNewGrid).toHaveBeenCalled();
    });

    test('toggleRun was called', () => {
        const toggleRun = jest.fn();
        const wrapper = shallow(<Grid run={false} grid={grid} toggleRun={toggleRun} />);
        wrapper.find('#toggleStart').simulate('click');
        expect(toggleRun).toHaveBeenCalled();
    });
});
