import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
    const renderLoginForm = () =>
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

    beforeEach(() => {
        renderLoginForm();
    });

    test("render LoginForm", () => {
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
        expect(screen.getByTestId("login-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("signup-button")).toBeInTheDocument();
        expect(screen.getByTestId("signup-button")).toHaveTextContent(
            "Create account"
        );
        expect(screen.getByTestId("signin-button")).toBeInTheDocument();
        expect(screen.getByTestId("signin-button")).toHaveTextContent(
            "Sign in"
        );
    });

    test("should navigate to the sign-up page", async () => {
        userEvent.click(screen.getByTestId("signup-button"));

        waitFor(() =>
            expect(screen.findByTestId("signup-form")).toBeInTheDocument()
        );
    });

    test("should show helpers on focus", async () => {
        userEvent.click(screen.getByTestId("login-input"));

        waitFor(() =>
            expect(
                screen.findByText("Field must contain 2 symbols a least")
            ).toBeInTheDocument()
        );

        userEvent.click(screen.getByTestId("password-input"));

        waitFor(() =>
            expect(
                screen.findAllByText("Field must contain 2 symbols a least")
            ).toHaveLength(2)
        );
    });

    test("should show helpers on input change", () => {
        userEvent.type(screen.getByTestId("login-input"), "234");

        waitFor(() =>
            expect(
                screen.findByText("Field should use at least one letter")
            ).toBeInTheDocument()
        );
    });

    test("should call submit handler on a submit click", async () => {
        const mockHandler = jest.fn();

        const submitButton = screen.getByTestId("signup-button");
        submitButton.onclick = mockHandler;

        expect(submitButton).toBeInTheDocument();

        await (async () => {
            submitButton.click();
        })();

        expect(mockHandler).toHaveBeenCalled();
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});
