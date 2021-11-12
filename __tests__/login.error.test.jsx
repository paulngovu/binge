/*
 * Testing for login error page
 */

import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoginError from '../pages/login/error';
import { TESTID_LOGIN_ERROR_BUTTON } from '../testIds';

describe('Login error page', () => {
  let tree;
  let getByTestId;

  beforeEach(() => {
    tree = renderer.create(<LoginError />).toJSON();
    ({ getByTestId } = render(<LoginError />));
  });

  test('Renders entire page', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Renders button to go back to login', () => {
    expect(getByTestId(TESTID_LOGIN_ERROR_BUTTON)).toBeTruthy();
  });
});
