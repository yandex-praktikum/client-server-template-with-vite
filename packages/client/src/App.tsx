import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LadderPage from "./pages/LadderPage/LadderPage";
import LoginPage from "./pages/login/LoginPage";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ProfileChangePage } from "./pages/profile-change/ProfileChangePage";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getYandexToken } from "./services/oAuthYandex";
import StartPage from "./pages/StartPage/StartPage";
import { ErrorBoundary } from "./pages/errorPages/ErrorBoundary";
import { ConfigProvider } from "antd";
import { themeActions, themeSelectors } from "./store/slices/theme/themeSlice";
import { ThemeNames } from "./store/slices/theme/typings";
import { MAP_NAME_TO_THEME } from "./constants/appTheme";
import MainLayout from "@/containers/MainLayout/MainLayout";

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(themeSelectors.all);

    const GamePage = lazy(() =>
        import("./pages/GamePage/GamePage").then(module => ({
            default: module.default,
        }))
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const code = new URLSearchParams(window.location.search).get(
                "code"
            );

            if (code) {
                getYandexToken(code, navigate, dispatch);
            }
        }
    }, []);

    useEffect(() => {
        const storedThemeName =
            typeof window !== "undefined"
                ? localStorage.getItem("theme")
                : "DARK";
        dispatch(
            themeActions.setTheme(
                MAP_NAME_TO_THEME[storedThemeName as ThemeNames]
            )
        );
    }, []);

    return (
        <ConfigProvider theme={theme.design}>
            <ErrorBoundary>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route
                            path="/game"
                            element={
                                <Suspense
                                    fallback={
                                        <MainLayout>
                                            <>Загрузка</>
                                        </MainLayout>
                                    }>
                                    <GamePage />
                                </Suspense>
                            }
                        />
                        <Route path="/sign-in" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/ladder" element={<LadderPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route
                            path="/profile-change"
                            element={<ProfileChangePage />}
                        />
                        <Route path="/*" element={<div>error404</div>} />
                    </Routes>
                </div>
            </ErrorBoundary>
        </ConfigProvider>
    );
};

export default App;
