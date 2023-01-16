import { Routes, Route, useNavigate } from "react-router-dom";
import LadderPage from "./pages/LadderPage/LadderPage";
import LoginPage from "./pages/login/LoginPage";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import GamePage from "./pages/GamePage/GamePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ProfileChangePage } from "./pages/profile-change/ProfileChangePage";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { getYandexToken } from "./services/oAuthYandex";

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const fetchServerData = async () => {
    //         const url = `http://localhost:${__SERVER_PORT__}/api`;
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         console.log(data);
    //     };

    //     fetchServerData();
    // }, []);

    // useEffect(() => {
    //     const code = new URLSearchParams(window.location.search).get("code");

    //     if (code) {
    //         getYandexToken(code, navigate, dispatch);
    //     }
    // }, []);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
            getYandexToken(code, navigate, dispatch);
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<GamePage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                {/* <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/ladder" element={<LadderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile-change" element={<ProfileChangePage />} /> */}
                <Route path="/*" element={<div>error404</div>} />
            </Routes>
        </div>
    );
};

export default App;
