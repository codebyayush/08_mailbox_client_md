import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';


describe("renders login page", () => {
    test("email text", () => {
        render(<Login/>);

        const inputElement = screen.getByText('Email', {exact: false});
        expect(inputElement).toBeInTheDocument("");
    })

    test('signup fireEvent test', () => {
            render(<Login/>);

            const signupButton = screen.getByRole('button', {name: /sign up/i});
            fireEvent.click(signupButton);

            const inputElement = screen.getByTestId("emailinput");
            expect(inputElement).toHaveValue("");
    })

    test("all inputs are initially empty", () => {
        render(<Login/>);
        
        const inputElementArr = screen.getAllByRole('textbox');

        for(let i =0; i<inputElementArr.length; i++){
            expect(inputElementArr[i]).toHaveValue("")
        }
    })

    test("confirm password is present or not", () => {
            render(<Login/>);

            const element = screen.getByText(/confirm password/i);
            expect(element).toBeInTheDocument();
    })
})
