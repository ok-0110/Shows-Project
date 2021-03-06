import React, { useState } from "react";
// import SubscriptionsTOMember from "./SubscriptionsTOMember";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Subscribers from "./Subscribers";
import { companyServer, subscriptionServer } from "../../URL";

export default function Member(props) {
  const navigate = useNavigate();
  const [reload, setReload] = props.setReload;

  const randomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const [random1, setrandom1] = useState(randomNumbers(-10, 10));
  const [random2, setrandom2] = useState(randomNumbers(-10, 10));

  const canDelete = JSON.parse(sessionStorage.getItem("canDelete"));

  const edit = () => {
    navigate(`/Subscribers/editmember/${props.data._id}`);
  };

  const deleteMember = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.Name}?`)) {
      // delet member
      await axios.delete(`${subscriptionServer}/members/${props.data._id}`);

      //delet Member from subs
      await axios.delete(`${subscriptionServer}/subscribers/${props.data._id}`);

      //reload
      setReload(!reload);
    }
  };

  return (
    // <div style={{ paddingLeft: "5px", border: "1px solid black", margin: "4px" }}>maxWidth: "584.23px",
    <div
      className="sub"
      style={{
        
        boxShadow: ` ${random1}px ${random2}px 1px #eb6363, ${random1}px ${random2}px 1px 1px black`,
        display: "flex",
      }}
    >
      {/* <div style={{ display: "flex" }}> */}
      <div style={{width:"250px" }}>
        <span className="fontBolder" style={{ fontSize: "17px" }}>
          {props.data.Name}
        </span>{" "}
        <br />
        <span className="fontBold">Email: </span>
        <span>{`${props.data.Email} `}</span> <br />
        <span className="fontBold">City: </span>
        <span>{`${props.data.City} `}</span> <br /> <br />
        {/* <SubscriptionsTOMember memberId={props.data._id} /> */}
        &nbsp;{" "}
        <button onClick={edit} className="edit" role="button">
          <span className="text">Edit</span>
        </button>{" "}
        &nbsp; &nbsp;
        {canDelete ? (
          <button onClick={deleteMember} className="delete" role="button">
            <span className="text">Delete</span>
          </button>
        ) : null}
      </div>
      <div style={{ paddingLeft: "5%" }}>
        <Subscribers memberId={props.data._id} setReload={props.setReload} />
      </div>
      {/* </div> */}
    </div>
  );
}
