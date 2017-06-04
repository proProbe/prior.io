import "../css/popup.css";
// import Greeting from "./popup/greeting_component.jsx";
import Main from "./popup/Main.jsx";
import React from "react";
import { render } from "react-dom";

render(
    <Main />,
    window.document.getElementById("app-container")
);