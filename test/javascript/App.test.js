import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { App } from '../../app/javascript/packs/App';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<App run={false} />);
    });

    test('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<App run={false} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should call saveGridToStore 4 times', () => {
        const setNewGrid = jest.fn();
        const instance = wrapper.instance();
        jest.spyOn(instance, "saveGridToStore").mockImplementation(setNewGrid);
        instance.rowsRef.current = {
            value: null
        }
        instance.colsRef.current = {
            value: null
        }
        wrapper.find('#createGrid1').simulate('click');
        wrapper.find('#createGrid2').simulate('click');
        wrapper.find('#createGrid3').simulate('click');
        wrapper.find('#randomGrid').simulate('click');
        expect(setNewGrid).toHaveBeenCalledTimes(4);
    });
});
