import { Routes, Route } from "react-router-dom";
import LadderPage from "./pages/LadderPage/LadderPage";
import "./App.css";
import ForumPage from "./pages/ForumPage/ForumPage";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<div>Main menu</div>} />
                <Route path="/sign-in" element={<div>sign-in</div>} />
                <Route path="/sign-up" element={<div>sign-up</div>} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/ladder" element={<LadderPage />} />
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
