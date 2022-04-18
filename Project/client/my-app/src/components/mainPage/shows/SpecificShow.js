import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Show from "./Show";
import {companyServer, subscriptionServer} from "../../URL"

export default function SpecificShow() {

  const { showid } = useParams();
  const [infoShow, setInfoShow] = useState();
  const [redy, setRedy] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      const { data: showData } = await axios.get(
        `${subscriptionServer}/shows/${showid}`
      );
      setInfoShow(showData);
      setRedy(true);
    };
    getdata();
  }, []);
  return (
    <div>{redy ? <Show key={1} data={infoShow} setReload={[reload, setReload]} /> : null}</div>
  );
}
