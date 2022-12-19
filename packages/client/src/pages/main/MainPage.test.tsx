import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainPage } from "./MainPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("MainPage", () => {
    const renderMainPage = () =>
        render(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

    beforeEach(() => {
        renderMainPage();
    });

    test("render MainPage", () => {
        expect(screen.getByTestId("main-page")).toBeInTheDocument();
        expect(screen.getByTestId("main-title")).toBeInTheDocument();
        expect(screen.getByTestId("main-score")).toBeInTheDocument();
        expect(screen.getByTestId("navigation")).toBeInTheDocument();
        expect(screen.getByTestId("start-game-button")).toBeInTheDocument();
    });

    test("titles should have right text content", () => {
        expect(screen.getByTestId("main-title")).toHaveTextContent(
            "Hello, USER"
        );
        expect(screen.getByTestId("main-score")).toHaveTextContent(
            "Your best score: 999"
        );
    });

    test("should navigate to the game page", async () => {
        userEvent.click(screen.getByTestId("start-game-button"));

        waitFor(() => expect(screen.findByTestId("game")).toBeInTheDocument());
    });

    test("should navigate to the profile page", async () => {
        userEvent.click(screen.getByTestId("goto-profile-btn"));

        waitFor(() =>
            expect(screen.findByTestId("profile-page")).toBeInTheDocument()
        );
    });

    test("should navigate to the leader board page", async () => {
        userEvent.click(screen.getByTestId("goto-ladder-btn"));

        waitFor(() =>
            expect(screen.findByTestId("leader-board")).toBeInTheDocument()
        );
    });

    test("should navigate to the forum page", async () => {
        userEvent.click(screen.getByTestId("goto-forum-btn"));

        waitFor(() =>
            expect(screen.findByTestId("forum-page")).toBeInTheDocument()
        );
    });

    test("should navigate to the login page", async () => {
        userEvent.click(screen.getByTestId("goto-login-btn"));

        waitFor(() =>
            expect(screen.findByTestId("login-page")).toBeInTheDocument()
        );
    });
});
