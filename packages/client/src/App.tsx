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
import axios from "axios";
import { getUserInfo } from "./services/authorization";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
            axios
                .post(`oauth/yandex`, {
                    code: code,
                    redirect_uri: "http://localhost:3000",
                })
                .then(async () => {
                    const userFormServer = await getUserInfo();

                    localStorage.setItem(
                        "user",
                        JSON.stringify(userFormServer.data)
                    );
                })
                .then(() => navigate("/"))
                .catch(error => {
                    console.log("error " + error);
                });
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<GamePage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/ladder" element={<LadderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile-change" element={<ProfileChangePage />} />
                <Route path="/*" element={<div>error404</div>} />
            </Routes>
        </div>
    );
};

export default App;
