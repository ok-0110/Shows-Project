import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddSubscripsion from "./AddSubscripsion";
import {companyServer, subscriptionServer} from "../../URL"

export default function Subscribers(props) {
 

  const [userSubscripsions, setUserSubscripsions] = useState({ Shows: [] });
  const [listOfSubs, setListOfSubs] = useState([]);
  const [Test, setTest] = useState(false);
  const [addSubComponent, setAddSubComponent] = useState(false);
  const [reload, setReload] = props.setReload;

  const getSub = async () => {
    const { data: responesFromDb } = await axios.get(
      `${subscriptionServer}/subscribers/memnerId/${props.memberId}`
    );
    setUserSubscripsions(responesFromDb);
    // console.log(responesFromDb);
  };
  useEffect(() => {
    getSub();
  }, []);

  const subToListItem = async () => {
    if (userSubscripsions.Shows.length >= 1) {
      // console.log("memberID", props.memberId);
      // console.log("userSubscripsions.Shows", userSubscripsions);
      
      const listItems = await Promise.all(
        userSubscripsions.Shows.map(async (el, index) => {
          const { data: showInfo } = await axios.get(
            `${subscriptionServer}/shows/${el.showId}`
          );
          // console.log("show ID" , el);
          // console.log("showInfo", showInfo);
          setTest(!Test);

          return (
            <li key={index} style={{listStyle:"none"}}>
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
    // <div style={{ paddingLeft: "5px", border: "1px solid black", margin: "4px" }}>
    <div >
      <span className="fontBold">Subscriptions status: </span>
      {userSubscripsions.Shows.length >= 1 ? <ul>{listOfSubs}</ul> : <span> no Subscriptions</span>}
      <button class="button-28" role="button" onClick={addSub}>
        Add Show to Subscriptions
      </button>
      {addSubComponent ? (
        <AddSubscripsion memberId={props.memberId} setReload={props.setReload} />
      ) : null}{" "}
    </div>
  );
  // return (<div>00</div>)
}
