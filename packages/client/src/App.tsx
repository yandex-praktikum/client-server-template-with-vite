import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/login/LoginPage";
import { MainPage } from "./pages/main/MainPage";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<div>sign-up</div>} />
                <Route path="/forum" element={<div>forum</div>} />
                <Route path="/ladder" element={<div>ladder</div>} />
                <Route path="/profile" element={<div>profile</div>} />
                <Route
                    path="/profile-change"
                    element={<div>profile-change</div>}
                />
                <Route path="/game" element={<div>game</div>} />
                <Route path="/*" element={<div>error404</div>} />
            </Routes>
        </div>
    );
};

export default App;
