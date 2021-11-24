// __tests__/snapshot.js
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Home from '../pages/index';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders homepage unchanged', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders food item card', () => {
  const wrapper = shallow(
    <Home />,
  );
  expect(wrapper.find("#food-item-card").exists()).toBeTruthy();
})

it('renders left and right arrows', () => {
  const wrapper = shallow(
    <Home />,
  );
  expect(wrapper.find("#left-arrow").exists()).toBeTruthy();
  expect(wrapper.find("#right-arrow").exists()).toBeTruthy();
})

it('changes food item on arrow click', async () => {
  const changeIndex = jest.fn();
  const wrapper = shallow(<Home onClick={changeIndex} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(index => [index, changeIndex]);

  wrapper.find('#left-arrow').simulate('click');
  expect(changeIndex).toBeTruthy();
})