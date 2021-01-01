import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./components/main/Main";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "25%" }}></div>
      <Main></Main>
      <div style={{ width: "25%" }}></div>
    </div>
  );
}

export default App;
