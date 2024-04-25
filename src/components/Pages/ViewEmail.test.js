import { render, screen } from "@testing-library/react"
import ViewEmail from "./ViewEmail"
import { Provider } from "react-redux"
import store from "../../Store"
import { MemoryRouter, Route, Routes } from "react-router-dom"

test('renders email subject and body when mail is clicked', () => {
    const clickedMail = {
      key: '1',
      subject: 'Test Email',
      mailText: '<p>Test content</p>',
    };

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/inbox/1']}>
            <Routes>
                <Route path="/inbox/:mailId" element={<ViewEmail/>} />
            </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Test Email')).toBeInTheDocument(); // Assert subject is rendered
    expect(getByText('Test content')).toBeInTheDocument(); // Assert body content is rendered
  });