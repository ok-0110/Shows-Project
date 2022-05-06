import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { companyServer } from "../URL";
import { startIntroLogIN } from "../../intro.js/loginIntro";
import "../../css/index.css"
import introJs from "intro.js";
export default function Login() {
  const navigate = useNavigate();
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [adminClick, setAdminClick] = useState(false);

  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);

  const [loggdUser, setLoggdUser] = useState({ userName: "", password: "" });

  const setUser = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "userName":
        isValid = validator.isAlphanumeric(e.target.value);
        setNameValid(e.target.value === "" ? true : isValid);
        break;

      case "password":
        isValid = validator.isAlphanumeric(e.target.value, "en-US", {
          ignore: ".,!@#$%^&*-+=_()/?'`;><[]{}|~",
        }); // /.,@#$%^&*()=-+ //
        setPasswordValid(e.target.value === "" ? true : isValid);
        break;

      default:
        break;
    }

    if (isValid) {
      let user = { ...loggdUser };
      user[e.target.name] = e.target.value;
      setLoggdUser({ ...user });
    }
  };

  const verifyUser = async () => {
    if (nameValid && passwordValid) {
      const { data: allUsers } = await axios.get(`${companyServer}/users`);
      const user = allUsers.find((el) => el.UserName === loggdUser.userName);
      if (user === undefined) {
        alert("user-name not match :(");
      } else {
        if (user.Password === loggdUser.password) {
          login(user);
        } else {
          alert("password not match :(");
        }
      }
      return;
    }
    //
  };

  const login = async (userObj) => {
    if (loggdUser.password !== "1234") {
      const { data: userPremission } = await axios.get(
        `${companyServer}/permissions/${userObj._id}`
      );
      sessionStorage.setItem("permissions", JSON.stringify(userPremission.permissions));
      sessionStorage.setItem("isLogged", JSON.stringify(true));
      if (userPremission.permissions.find((el) => el === "Admin")) {
        sessionStorage.setItem("isAdmin", JSON.stringify(true));
        sessionStorage.setItem("name", JSON.stringify("admin"));
      } else {
        sessionStorage.setItem("isAdmin", JSON.stringify(false));
        const { data: useremployee } = await axios.get(`${companyServer}/employee/${userObj._id}`);
        sessionStorage.setItem("name", JSON.stringify(`${useremployee.firstName}`));
      }
      setAnyChange(!anyChange);
    } else {
      alert("is first time for you");
      navigate("/newuser");
    }
  };

  const adminButt = async () => {
    introJs().exit()
    // await setLoggdUser({userName: "admin", password: "admin"} )
    setLoggdUser({ userName: "admin", password: "admin" });
    setAdminClick(!adminClick);
  };

  useEffect(() => {
    if (adminClick) {
      verifyUser();
    }
  }, [adminClick]);

  useEffect(() => {
    startIntroLogIN();
  }, []);

  

  return (
    <div className="loginDiv" style={{ marginTop: "8%" }}>
      &nbsp; <span className="fontBolder font_x-large centeredText">Login</span> <br />
      <br />
      <button className="admin centeredText" onClick={adminButt}>
        Admin
      </button>
      <br />
      <br />
      <input
        name="userName"
        className="loginInput"
        placeholder="UserName"
        id="userName"
        onChange={setUser}
        type={"text"}
      />{" "}
      <br />
      {nameValid ? null : <span>name is invalid use only A-Z , a-z , 1-9</span>}
      <br />
      <input
        name="password"
        className="loginInput"
        placeholder="Password"
        id="password"
        onChange={setUser}
        type={"password"}
      />{" "}
      <br />
      {passwordValid ? null : <span>password is invalid dont use space </span>}
      <br />
      <button className="loginButton , fontBolder " onClick={verifyUser}>
        log me
      </button>{" "}
      <br />
      <br />
      <Link to="/newuser" className="centeredText ">
        First time?
      </Link>
      <br />
      <br />
    </div>
  );
}
