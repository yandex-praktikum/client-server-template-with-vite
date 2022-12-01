import ConfigProvider from "antd/es/config-provider";
import { useEffect } from "react";
import "./App.css";
import { appTheme } from "./constants/appTheme";
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
    <ConfigProvider theme={appTheme}>
      <div className="App">
        <Login />
      </div>
    </ConfigProvider>
  );
};

export default App;
