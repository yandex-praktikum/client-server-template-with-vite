import { Routes, Route } from "react-router-dom";
import LadderPage from "./pages/LadderPage/LadderPage";
import "./App.css";
import { LoginPage } from "./pages/login/LoginPage";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import { MainPage } from "./pages/main/MainPage";
import ForumPage from "./pages/ForumPage/ForumPage";
import GamePage from "./pages/GamePage/GamePage";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/ladder" element={<LadderPage />} />
                <Route path="/profile" element={<div>profile</div>} />
                <Route
                    path="/profile-change"
                    element={<div>profile-change</div>}
                />
                <Route path="/game" element={<GamePage />} />
                <Route path="/*" element={<div>error404</div>} />
            </Routes>
        </div>
    );
};

export default App;
