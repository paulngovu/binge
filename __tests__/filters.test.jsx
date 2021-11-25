// __tests__/snapshot.js
import React from 'react';
import Filters from '../components/Filters';
import User from '../classes/User';
import Filter from '../edamamAPI/Filter';
import { render, fireEvent } from '@testing-library/react';

describe('Filters component', () => {
  it('renders filtering elements correctly', () => {
    const { queryByText } = render(
      <Filters
        onSubmit={() => {}}
        user={new User("Joe Bruin", new Filter("", "", "", ""), [])}
      />
    );

    expect(queryByText("Meal Type")).toBeTruthy();
    expect(queryByText("Cuisine Type")).toBeTruthy();
    expect(queryByText("Dish Type")).toBeTruthy();
    expect(queryByText("Update")).toBeTruthy();
  })

  it('allows meal type selection and submits correctly', () => {
    const mockCallback = jest.fn(() => 1);
    const { queryByTestId, queryByText } = render(
      <Filters
        onSubmit={mockCallback}
        user={new User("Joe Bruin", new Filter("", "", "", ""), [])}
      />
    );
  
    fireEvent.click(queryByTestId("meal-type-select"));
    fireEvent.click(queryByText("Dinner"));
    fireEvent.click(queryByText("Update"));
    fireEvent.click(queryByText("Update"));
  
    expect(mockCallback.mock.calls.length).toBe(2);
  })
});