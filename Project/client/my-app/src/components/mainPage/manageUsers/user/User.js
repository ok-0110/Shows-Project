import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../MainContext";
import axios from "axios";

export default function User(props) {
  const {
    links: {companyServer, subscriptionServer},
  } = useContext(MainContext);

  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const [reload, setReload] = props.setReload;

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
      await axios.delete(`https://company-server.vercel.app/company/users/${props.data.userId}`);
      //permission
      await axios.delete(`https://company-server.vercel.app/company/permissions/${props.data.userId}`);
      //employee
      await axios.delete(`https://company-server.vercel.app/company/employee/${props.data.userId}`);
      //reload
      setReload(!reload);
    }
  };

  const edit = () => {
    navigate(`/manageusers/editUser/${props.data.userId}`);
  };

  return (
    <div style={{paddingLeft:"5px", border: "1px solid black", margin: "4px" }}>
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
      <span className="fontBold">{`permissions:`}</span>
      <ul>
        {permissions.permissions === undefined
          ? null
          : permissions.permissions.map((el, index) => <li key={index}>{el}</li>)}
      </ul>
      &nbsp;<button onClick={edit} class="edit" name="">
        <span class="text">Edit</span>
      </button>{" "}
      &nbsp; &nbsp;
      <button onClick={deleteUser} class="delete" name="">
        <span class="text">Delete</span>
      </button>
      <br />
      <br />
    </div>
  );
}
