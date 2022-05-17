import React, { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ManageUsers from "./manageUsers/ManageUsers";
import Shows from "./shows/Shows";
import Members from "./Subscribers/Members";
import introJs from "intro.js";
import { mainPageIntro, mainPageIntroSkeep, getCorentStep, restart } from "../../intro.js/mainIntro";

export default function MainPage() {
  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);
  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  const nameOfUser = JSON.parse(sessionStorage.getItem("name"));
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));

  const [help, setHelp] = useState(true);

  const navigate = useNavigate();

  const navigateTo = (e) => {
    console.log("getCorentStep",getCorentStep());
    console.log("click on",e.target.name);

    navigate(`/${e.target.name}`);
    if (e.target.name === "manageusers" && getCorentStep() === 1) {
      // mainPageIntroSkeep();
    }
    if (e.target.name === "shows" && getCorentStep() === 6) {
       mainPageIntroSkeep();
    }
    if (e.target.name === "Subscribers" && getCorentStep() === 9) {
       mainPageIntroSkeep();
    }
  };

  const logOut = () => {
    if (window.confirm("log out?")) {
      sessionStorage.clear();
      console.log("logOut");
      navigate("/");
      setAnyChange(!anyChange);
    }
  };

  const adminButtons = (
    <div>
      &nbsp; &nbsp;{" "}
      <button
        className="mainButton"
        role="button"
        onClick={navigateTo}
        id="manageusers"
        name="manageusers"
      >
        Users Managment
      </button>
      {/* &nbsp;&nbsp; */}
      <button className="mainButton" role="button" onClick={navigateTo} name="shows">
        Shows
      </button>
      {/* &nbsp;&nbsp; */}
      <button className="mainButton" role="button" onClick={navigateTo} name="Subscribers">
        Subscriptions
      </button>
      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      <button className="mainButton" role="button" onClick={logOut}>
        Log Out
      </button>{" "}
      &nbsp;
    </div>
  );
  const employeeButtons = (
    <div>
      &nbsp; &nbsp;{" "}
      {permissions.find((el) => el === "View Movies") ? (
        <button className="mainButton" role="button" onClick={navigateTo} name="shows">
          Shows
        </button>
      ) : null}
      {permissions.find((el) => el === "View Subscriptions") ? (
        <button className="mainButton" role="button" onClick={navigateTo} name="Subscribers">
          Subscriptions
        </button>
      ) : null}
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      <button className="mainButton" role="button" onClick={logOut}>
        Log Out
      </button>{" "}
      &nbsp;
    </div>
  );

  useEffect(() => {
    mainPageIntro();
  }, []);

  //=============================================start of return

  return (
    // <div  style={{ maxWidth: "700px", border: "1px solid black", margin: "4px" }}>
    // <div className="mainPageDiv" >
    <div className="">
      <div className="mainPageDiv" style={{ maxWidth: "608" }}>
        <h3>&nbsp;&nbsp;{`Hello ${nameOfUser}, welcome back`}</h3>
        <br />
        {isAdmin ? adminButtons : employeeButtons}
      </div>
      <br />
      <Routes>
        <Route path="*" element={<Shows />} />
        {/* <Route path="/" element={null} /> */}
        <Route path="/manageusers/*" element={<ManageUsers />} />
        <Route path="/shows/*" element={<Shows />} />
        <Route path="/Subscribers/*" element={<Members />} />
      </Routes>
    </div>
  );
}
