// __tests__/snapshot.js
import React from 'react';
import Layout from '../components/Layout';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders appropriate buttons depending on passed props', () => {
  const wrapper = shallow(<Layout buttons={["filter", "chats", "profile"]} />);

  expect(wrapper.find("#filters-btn").exists()).toBeTruthy();
  expect(wrapper.find("#chats-btn").exists()).toBeTruthy();
  expect(wrapper.find("#profile-btn").exists()).toBeTruthy();
  expect(wrapper.find("#home-btn").exists()).toBeFalsy();
})

it('renders filters dropdown on filters icon click', () => {
  const toggleFiltersDrop = jest.fn();
  const wrapper = shallow(<Layout buttons={["filter", "chats", "profile"]} onClick={toggleFiltersDrop} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(showFiltersDrop => [showFiltersDrop, toggleFiltersDrop]);

  wrapper.find('#filters-btn').simulate('click');
  expect(toggleFiltersDrop).toBeTruthy();
})