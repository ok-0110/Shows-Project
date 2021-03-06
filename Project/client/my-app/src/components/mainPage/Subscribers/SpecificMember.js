import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Member from "./Member";
import {companyServer, subscriptionServer} from "../../URL"

export default function SpecificMember() {
  const navigate = useNavigate();
  const { memberid } = useParams();
  const [infomember, setInfoMember] = useState();
  const [redy, setRedy] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      const { data: memberData } = await axios.get(
        `${subscriptionServer}/members/${memberid}`
      );
      setInfoMember(memberData);
      setRedy(true);
    };
    getdata();
  }, []);
  return (
    <div>{redy ? <Member key={1} data={infomember} setReload={[reload, setReload]} /> : null}</div>
  );
}
