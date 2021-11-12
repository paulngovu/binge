/*
 * Testing for login page
 */

import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Login from '../pages/login';
import {
  TESTID_LOGIN_BUTTON,
  TESTID_LOGIN_PASSWORD,
  TESTID_LOGIN_TITLE,
  TESTID_LOGIN_USERNAME,
} from '../testIds';

describe('Login page', () => {
  let tree;
  let getByTestId;

  beforeEach(() => {
    tree = renderer.create(<Login />).toJSON();
    ({ getByTestId } = render(<Login />));
  });

  test('Renders entire page', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Renders title', () => {
    expect(getByTestId(TESTID_LOGIN_TITLE)).toBeTruthy();
  });

  test('Renders username field', () => {
    expect(getByTestId(TESTID_LOGIN_USERNAME)).toBeTruthy();
  });

  test('Renders password field', () => {
    expect(getByTestId(TESTID_LOGIN_PASSWORD)).toBeTruthy();
  });

  test('Renders login button', () => {
    expect(getByTestId(TESTID_LOGIN_BUTTON)).toBeTruthy();
  });
});
