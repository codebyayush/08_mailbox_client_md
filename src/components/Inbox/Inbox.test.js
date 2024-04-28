import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Inbox from './Inbox';
import store from '../../Store';

test('renders Inbox component with mail items', () => {
  const inboxData = [
    { key: '1', subject: 'Test Email 1', read: false },
    { key: '2', subject: 'Test Email 2', read: true },
  ];
  const email = 'ayushpal@gmail.com'

  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Inbox />
      </MemoryRouter>
    </Provider>
  );

  // Assert that mail subjects are rendered
  expect(getByText('Test Email 1')).toBeInTheDocument();
  expect(getByText('Test Email 2')).toBeInTheDocument();
});