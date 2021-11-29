import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chats from '../pages/chats';

configure({ adapter: new Adapter() });

describe('Chats page', () => {
  const emptyChats = {
    allMessages: {},
    foodChats: [],
    foodData: [],
    username: "testuser"
  };

  const testChats = {
    allMessages: {},
    foodChats: ['foodA'],
    foodData: [],
    username: "testuser"
  };

  it('renders chats page with empty sidebar', () => {
    const tree = renderer.create(<Chats 
        allMessages={emptyChats["allMessages"]}
        foodChats={emptyChats["foodChats"]}
        foodData={emptyChats["foodData"]}
        username={emptyChats["username"]}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders prompt message when sidebar is empty', () => {
    const chats = shallow(<Chats 
        allMessages={emptyChats["allMessages"]}
        foodChats={emptyChats["foodChats"]}
        foodData={emptyChats["foodData"]}
        username={emptyChats["username"]}
    />);
    expect(chats.contains('Chats will show up after you like a food item!')).toBeTruthy();
  });

  it('renders food name in sidebar when liked', () => {
    const chats = shallow(<Chats 
        allMessages={testChats["allMessages"]}
        foodChats={testChats["foodChats"]}
        foodData={testChats["foodData"]}
        username={testChats["username"]}
    />);
    expect(chats.contains('foodA')).toBeTruthy();
  });

});
