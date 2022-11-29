import { useEffect } from "react";
import "./App.css";
import { Login } from "./pages/login/Login";

const App = () => {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   fetchServerData();
  // }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
