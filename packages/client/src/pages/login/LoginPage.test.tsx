import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
    const renderLoginPage = () =>
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

    beforeEach(() => {
        renderLoginPage();
    });

    test("render LoginPage", () => {
        expect(screen.getByTestId("login-page")).toBeInTheDocument();
        expect(screen.getByTestId("video-container")).toBeInTheDocument();
        expect(screen.getByTestId("form-container")).toBeInTheDocument();
        expect(screen.getByTestId("logo")).toBeInTheDocument();
        expect(screen.getByTestId("logo-underline")).toBeInTheDocument();
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });
});
