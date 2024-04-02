import { useSelector } from "react-redux";
import "./App.css";
import Profile from "./Components/Activity";
import Login from "./Components/User/Login";
import Navigation from "./Components/Navigation/Navigation";
import { useState } from "react";

function App() {
  const state = useSelector((state) => state.login);
  const [currentWindow, setCurrentWindow] = useState("login");

  const screenHandler = (screen) => {
    setCurrentWindow(screen);
  };

  return (
    <>
      <Navigation changeScreen={screenHandler} />
      {state.name && <h1 className="heading">Welcome {state.name}</h1>}
      {currentWindow === "login" && !state.name && <Login />};
      {currentWindow === "activity" && state.name ? <Profile /> : <Login />}
    </>
  );
}

export default App;
