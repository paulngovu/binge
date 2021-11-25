// __tests__/snapshot.js
import React from 'react';
import Layout from '../components/Layout';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';

configure({ adapter: new Adapter() });

describe('Layout component', () => {
  it('renders appropriate buttons depending on passed props', () => {
    const { queryByTestId } = render(
      <Layout buttons={["filter", "chats", "profile"]} />
    );

    expect(queryByTestId("filters-btn")).toBeTruthy();
    expect(queryByTestId("chats-btn")).toBeTruthy();
    expect(queryByTestId("profile-btn")).toBeTruthy();
    expect(queryByTestId("home-btn")).toBeNull();
  })

  it('renders filters dropdown on filters icon click', () => {
    const toggleFiltersDrop = jest.fn();
    const wrapper = shallow(<Layout buttons={["filter", "chats", "profile"]} onClick={toggleFiltersDrop} />);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(showFiltersDrop => [showFiltersDrop, toggleFiltersDrop]);

    wrapper.find('#filters-btn').simulate('click');
    expect(toggleFiltersDrop).toBeTruthy();
  })
});