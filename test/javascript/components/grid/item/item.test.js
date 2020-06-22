import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { Item } from '../../../../../app/javascript/components/grid/item/item';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('Item Component', () => {
    const aliveArray = [
        [true]
    ];

    const options = {
        row: 0,
        col: 0
    };

    test('renders', () => {
        const wrapper = shallow(<Item options={options} aliveArray={aliveArray} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<Item options={options} aliveArray={aliveArray} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('calls toggleCell on click', () => {
        const toggleCell = jest.fn();
        const wrapper = mount(<Item options={options} aliveArray={aliveArray} toggleCell={toggleCell} />);

        wrapper.find('div').simulate('click');
        expect(toggleCell).toHaveBeenCalled();
    });
});
