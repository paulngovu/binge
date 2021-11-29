import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../pages/profile';
import {
  TESTID_PROFILE_BIO_BUTTON,
  TESTID_PROFILE_BIO_FIELD,
} from '../testIds';

describe('Profile page', () => {
  const testUser = {
    username: 'Joe Bruin',
    bio: 'Default bio.',
  };

  it('renders profile elements', () => {
    const tree = renderer.create(<Profile user={testUser} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders username correctly', () => {
    const profile = render(<Profile user={testUser} />);
    expect(profile.getByText('Joe Bruin')).toBeTruthy();
  });

  it('renders user bio correctly', () => {
    const profile = render(<Profile user={testUser} />);
    expect(profile.getByText('Default bio.')).toBeTruthy();
  });

  it('should allow bio to be changed', () => {
    // shows original bio
    const profile = render(<Profile user={testUser} />);
    expect(profile.getByText('Default bio.')).toBeTruthy();

    // edit bio
    fireEvent.click(profile.getByText(/Edit/i));
    const input = profile.getByTestId(TESTID_PROFILE_BIO_FIELD);
    fireEvent.change(input, { target: { value: 'New bio!' } });
    expect(input.value).toBe('New bio!');

    // submit change
    fireEvent.click(profile.getByTestId(TESTID_PROFILE_BIO_BUTTON));

    // expect new bio
    expect(profile.getByText('New bio!')).toBeTruthy();
    expect(profile.queryByText('Default bio.')).toBeNull();
  });
});
