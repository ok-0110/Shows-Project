import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { companyServer, subscriptionServer } from "../../../URL";

export default function User(props) {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const [reload, setReload] = props.setReload;

  const randomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const [random1, setrandom1] = useState(randomNumbers(-10, 10));
  const [random2, setrandom2] = useState(randomNumbers(-10, 10));

  useEffect(() => {
    getUserPermissions();
  }, []);

  const getUserPermissions = async () => {
    const { data: UserPermissions } = await axios.get(
      `${companyServer}/permissions/${props.data.userId}`
    );
    setPermissions(UserPermissions);
  };

  const deleteUser = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.firstName}`)) {
      //user
      await axios.delete(`${companyServer}/users/${props.data.userId}`);
      //permission
      await axios.delete(`${companyServer}/permissions/${props.data.userId}`);
      //employee
      await axios.delete(`${companyServer}/employee/${props.data.userId}`);
      //reload
      setReload(!reload);
    }
  };

  const edit = () => {
    navigate(`/manageusers/editUser/${props.data.userId}`);
  };

  return (
    // <div style={{paddingLeft:"5px", border: "1px solid black", margin: "4px" }}>
    <div
      className="user"
      style={{
        boxShadow: ` ${random1}px ${random2}px 1px #e9acbe, ${random1}px ${random2}px 1px 1px black`,
        display: "flex",
      }}
    >
      <div>
        <span className="fontBold">Name: </span>
        <span
          className="fontBolder"
          style={{ fontSize: "17px" }}
        >{`${props.data.firstName} ${props.data.lastName}`}</span>{" "}
        <br />
        <span className="fontBold">UserName: </span>
        <span>{`${props.data.userName}`}</span> <br />
        <span className="fontBold">created date: </span>
        <span>{`${props.data.createdDate.slice(0, 10)}`}</span> <br />
        <span className="fontBold">session timeOut: </span>
        <span>{`${props.data.SessionTimeOut}`}</span> <br />
        &nbsp;
        <button onClick={edit} className="edit" name="">
          <span className="text">Edit</span>
        </button>{" "}
        &nbsp; &nbsp;
        <button onClick={deleteUser} className="delete" name="">
          <span className="text">Delete</span>
        </button>
      </div>

      <div style={{ paddingLeft: "8%" }}>
        <span className="fontBold">{`permissions:`}</span>
        <ul>
          {permissions.permissions === undefined || permissions.permissions.length <= 1 ? (
            <li key={1} style={{ listStyle: "none" }}>
              No permissions
            </li>
          ) : (
            permissions.permissions.map((el, index) => <li key={index}>{el}</li>)
          )}
        </ul>
      </div>

      <br />
      <br />
    </div>
  );
}
