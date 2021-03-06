import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AddMember from "./AddMember";
import AllMembers from "./AllMembers";
import EditMember from "./EditMember";
import SpecificMember from "./SpecificMember";

export default function Subscriptions() {
  const navigate = useNavigate();

  const [canView, setCanView] = useState(undefined);
  const [canCreate, setCanCreate] = useState(false);

  const [searchTaxtInStaet, setSearchTaxtInStaet] = useState("");

  const setPermisionsfromsession = () => {
    const response = sessionStorage.getItem("permissions");
    const arrOfPermi = JSON.parse(response);
    if (arrOfPermi.find((el) => el === "Create Subscriptions")) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
    if (arrOfPermi.find((el) => el === "Delete Subscriptions")) {
      sessionStorage.setItem("canDelete", "true");
    } else {
      sessionStorage.setItem("canDelete", "false");
    }
    if (arrOfPermi.find((el) => el === "View Subscriptions")) {
      setCanView(true);
    } else {
      setCanView(false);
    }
  };

  const userVerify = () => {
    if (!canView) {
      navigate("/");
    }
  };

  useEffect(() => {
    setPermisionsfromsession();
  }, []);

  useEffect(() => {
    if (canView !== undefined) {
      userVerify();
    }
  });

  const allMemberButton = () => {
    navigate("/Subscribers/allmembers");
  };
  const addMemberButton = () => {
    navigate("/Subscribers/addmember");
  };

  return (
    <div>
       <div className="nevBarSubs">
      &nbsp; <button onClick={allMemberButton} className="all">All Members</button>
      &nbsp; {canCreate ? <button onClick={addMemberButton} className="add">Add Members</button> : null}
      </div>
      
      <Routes>
        <Route path="*" element={<AllMembers />} />
        <Route path="/allmembers" element={<AllMembers />} />
        <Route path="/addmember" element={<AddMember />} />
        <Route path="/editmember/:memberid" element={<EditMember />} />
        <Route path="/specificmember/:memberid" element={<SpecificMember />} />
      </Routes>
    </div>
  );
}
