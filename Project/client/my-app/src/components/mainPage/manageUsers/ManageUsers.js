import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import EditUser from "./user/EditUser";

import { mainPageIntro, mainPageIntroSkeep, getCorentStep ,restart} from "../../../intro.js/mainIntro";

export default function ManageUsers() {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("isAdmin"))) {
      navigateToMainPage();
    }
  });

 



  const navigateTo = (e) => {
    navigate(`/${e.target.name}`);
    // if (e.target.name === "manageusers/adduser" && getCorentStep() === 2) {
    //   mainPageIntroSkeep();
    // }
  };

  const buttons = (
    <div>
      &nbsp;{" "}
      <button onClick={navigateTo} className="all"  name="manageusers/allusers">
        All Users
      </button>
      &nbsp;{" "}
      <button onClick={navigateTo} className="add" id="manageusers_adduser" name="manageusers/adduser">
        Add User
      </button>
      &nbsp;
    </div>
  );

// function next() {
//   mainPageIntroSkeep()
// }
  useEffect(() => {
    if (getCorentStep()===1) {
      restart(3)
    }
  },[]);

  return (
    <div>
      <div className="nevBarUser">{buttons}</div>

      <Routes>
        <Route path="*" element={<AllUsers />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/editUser/:userid" element={<EditUser />} />
      </Routes>
    </div>
  );
  
}
