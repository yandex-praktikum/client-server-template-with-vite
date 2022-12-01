import ConfigProvider from "antd/es/config-provider";
import { useEffect } from "react";
import "./App.css";
import { appTheme } from "./constants/appTheme";
import { LoginPage } from "./pages/login/LoginPage";

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
        <LoginPage />
      </div>
    </ConfigProvider>
  );
};

export default App;
