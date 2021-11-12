import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import Profile from '../pages/profile';

test('renders profile', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('should allow name to be changed', () => {
    // render profile with Joe Bruin (default name)
    const profile = render(<Profile />);
    expect(profile.getByText('Joe Bruin')).toBeTruthy();

    // edit name
    fireEvent.click(profile.getByText(/Edit/i));
    const input = profile.getByTestId('input-name');
    fireEvent.change(input, {target: {value: 'Sally Bruin'}})
    expect(input.value).toBe('Sally Bruin');

    // submit change
    fireEvent.click(profile.getByText(/Submit/i));

    // expect profile to render new name instead of old name
    expect(profile.getByText('Sally Bruin')).toBeTruthy();
    expect(profile.queryByText('Joe Bruin')).toBeNull();
})

