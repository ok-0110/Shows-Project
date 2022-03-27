import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddSubscripsion from "./AddSubscripsion";

export default function Subscribers(props) {
  const [userSubscripsions, setUserSubscripsions] = useState({ Shows: [{ showId: "" }] });
  const [listOfSubs, setListOfSubs] = useState([]);
  const [addSubComponent, setAddSubComponent] = useState(false);
  const [reload, setReload] = props.setReload;
  

  const getSub = async () => {
    const { data: responesFromDb } = await axios.get(
      `https://subscriptions-server.vercel.app/subscriptions/subscribers/memnerId/${props.memberId}`
    );

    setUserSubscripsions(responesFromDb);
  };
  useEffect(() => {
    getSub();
  }, []);

  const subToListItem = async () => {
     
    if (userSubscripsions.Shows.length >= 1) {

      const listItems = await Promise.all(
        userSubscripsions.Shows.map(async (el, index) => {
          const { data: showInfo } = await axios.get(
            `https://subscriptions-server.vercel.app/subscriptions/shows/${el.showId}`
          );

          return (
            <li key={index}>
              {" "}
              <Link to={`/shows/specifishow/${el.showId}`}>{`${showInfo.Name},`}</Link>
              {` ${el.date}`}
            </li>
          );
        })
      );
      const helper = [...listOfSubs];
      helper.push(listItems);
      setListOfSubs(helper);
    }
  };

  useEffect(() => {
    subToListItem();
  }, [userSubscripsions]);

  const addSub = () => {
    const helper = addSubComponent;
    setAddSubComponent(!helper);
  };

  return (
    <div style={{paddingLeft: "5px" , border: "1px solid black", margin: "4px" }}>
    
      <span>Shows Watched</span> <br />
      &nbsp;<button class="button-28" role="button" onClick={addSub}>Add Show to Subscriptions</button>
      {addSubComponent?<AddSubscripsion memberId={props.memberId} setReload={props.setReload}/>:null} <br/>
      <span  className="fontBold">Subscriptions status: </span>
      {userSubscripsions.Shows.length >= 1 ? <ul>{listOfSubs}</ul> : <span> no Subscriptions</span>}
    </div>
  );
  // return (<div>00</div>)
}
