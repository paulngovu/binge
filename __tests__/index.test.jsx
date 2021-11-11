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
  const { getByTestId } = render(
    <Home />,
  );
  expect(getByTestId("food-item-card")).toBeTruthy();
})

it('renders left and right arrows', () => {
  const { getByTestId } = render(
    <Home />,
  );
  expect(getByTestId("left-arrow")).toBeTruthy();
  expect(getByTestId("right-arrow")).toBeTruthy();
})

it('changes food item on arrow click', async () => {
  const changeIndex = jest.fn();
  const wrapper = shallow(<Home onClick={changeIndex} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(index => [index, changeIndex]);

  wrapper.find('#left-arrow').simulate('click');
  expect(changeIndex).toBeTruthy();
})