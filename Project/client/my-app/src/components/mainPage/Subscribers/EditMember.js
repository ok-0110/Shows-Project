import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import {companyServer, subscriptionServer} from "../../URL"

export default function EditMember() {
  const navigate = useNavigate();
  const { memberid } = useParams();

  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);

  const [newMemberInfo, setNewMemberInfo] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const settingMember = async () => {
    const { data: membersFromAxios } = await axios.get(
      `${subscriptionServer}/members/${memberid}`
    );

    setNewMemberInfo({ ...membersFromAxios });
  };

  useEffect(() => {
    settingMember();
  }, []);

  const setMemberInfo = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "Name":
        isValid = validator.isAlpha(e.target.value, "en-US", {
          ignore: " -",
        });
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: 10 });
        }
        setNameValid(isValid);
        break;

      case "Email": //================
        isValid = validator.isEmail(e.target.value);
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: undefined });
        }
        setEmailValid(isValid);
        break;
      case "City":
        isValid = validator.isAlpha(e.target.value, "en-US", {
          ignore: " -",
        });
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: 10 });
        }
        setCityValid(isValid);
        break;

      default:
        break;
    }
    if (nameValid && emailValid && cityValid) {
    }
    let member = { ...newMemberInfo };
    member[e.target.name] = e.target.value;
    setNewMemberInfo({ ...member });
  };

  const cancel = () => {
    navigate("/Subscribers/allmembers");
  };

  const submit = async () => {
    if (nameValid && emailValid && cityValid) {
      //sand to db
      await axios.put(`${subscriptionServer}/members/${memberid}`, newMemberInfo);
      //back to all member
      alert("member updated");
      navigate("/Subscribers/allmembers");
    }
  };

  return (
    <div className="addOrEditSub">
      <span className="fontBolder" style={{ fontSize: "20px" }}>
        Edit Member{" "}
      </span>{" "}
      <br /> <br />
      <label className="fontBold" htmlFor="member Name">
        member Name:{" "}
      </label>
      <input type={"text"} onChange={setMemberInfo} name="Name" defaultValue={newMemberInfo.Name} />
      <br />
      {nameValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          name is invalid use only A-Z , a-z ond Min of 2 letters and max of 10
        </span>
      )}{" "}
      <br />
      <label className="fontBold" htmlFor="Email">
        Email:{" "}
      </label>
      <input
        type={"text"}
        onChange={setMemberInfo}
        name="Email"
        defaultValue={newMemberInfo.Email}
      />
      <br />
      {emailValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          email is invalid use "normal" email and Min of 2 letters{" "}
        </span>
      )}{" "}
      <br />
      <label className="fontBold" htmlFor="City">
        City:{" "}
      </label>
      <input type={"text"} onChange={setMemberInfo} name="City" defaultValue={newMemberInfo.City} />
      <br />
      {cityValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          name is invalid use only A-Z , a-z ond Min of 2 letters and max of 10
        </span>
      )}{" "}
      <br />
      &nbsp;{" "}
      <button className="updateOrAdd" role="button" onClick={submit} name="submit">
        <span className="text">Update</span>
      </button>
      &nbsp;{" "}
      <button className="cancel" role="button" onClick={cancel} name="cancel">
        {" "}
        <span className="text">Cancel</span>
      </button>
      <br />
      <br />
    </div>
  );
}
