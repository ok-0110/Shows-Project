import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from "./Member";
import {companyServer, subscriptionServer} from "../../URL"

export default function AllMembers() {
  const [allMembers, setAllMembers] = useState([]);
  const [reload, setReload] = useState(false);

  const getAllMembers = async () => {
    const { data: allMembersFromDB } = await axios.get(`${subscriptionServer}/members`);

    const Shwos = allMembersFromDB.map((el) => {
      return <Member key={el._id} data={el} setReload={[reload, setReload]} />;
    });
    setAllMembers(Shwos);
  };
  useEffect(() => {
    getAllMembers();
  }, [reload]);
  return (
    <div>
      {allMembers}
    </div>
  );
}
