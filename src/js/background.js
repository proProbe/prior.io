// @flow
import Main from "./background/Main.jsx";
import React from "react";
import { render } from "react-dom";

render(
    <Main />,
    window.document.getElementById("background-container")
);
