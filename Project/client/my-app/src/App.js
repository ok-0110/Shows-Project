import React from "react";
import Main from "./components/Main";
import "./css/fonts.css";
import "./css/button.css";
import "./css/login.css";
import "./css/body.css";
import "./css/mainPage.css";
import "./css/styleForShow.css";
import "./css/styleForSubs.css";
import "./css/styleForUsers.css";
import "./css/intro.css";
import "./css/resume.css";

export default function App() {
  return (
    <div className="font300">
      <br />
      <div className="div101">
        <a
          className="a101"
          href="https://drive.google.com/file/d/1LlZtG7WIAC6ZVDdYYB3-25ZMX9Rqolki/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          My resume
        </a>
      </div>
      <Main />
    </div>
  );
}
