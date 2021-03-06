import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {companyServer, subscriptionServer} from "../../URL"

export default function SubscriptionsTOShow(props) {
  const [allSubs, setAllSubs] = useState([]);
  const [listOfSub, setListOfSub] = useState([]);

  const getSubsToShow = async () => {
    const { data: SubsFromDb } = await axios.get(`${subscriptionServer}/subscribers`);

    SubsFromDb.forEach((element) => {
      const userSub = { userId: " ", date: " " };
      //   console.log(element);

      element.Shows.forEach((el) => {
        if (el.showId === props.showId) {
          userSub.date = el.date;
        }
      });

      if (userSub.date !== " ") {
        userSub.userId = element.MemberId;
        const handel = [...allSubs];
        handel.push(userSub);
        setAllSubs(handel);
      }
    });
  };
  useEffect(() => {
    getSubsToShow();
  }, []);

  const convertAllSubsToPage = async () => {
    if (allSubs.length >= 1) {
      const allReleventSubs = await Promise.all(
        allSubs.map(async (el, index) => {
          const { data: membersForLi } = await axios.get(
            `${subscriptionServer}/members/${el.userId}`
          );

          return (
            <li key={index} style={{listStyle:"none"}}>
              <Link to={`/Subscribers/specificmember/${el.userId}`}>{`${membersForLi.Name},`}</Link>
              {` ${el.date}`}
            </li>
          );
        })
      );
      const helper = [...listOfSub];

      helper.push(allReleventSubs);

      setListOfSub(helper);
    }
  };

  useEffect(() => {
    //   console.log(allSubs);
    convertAllSubsToPage();
  }, [allSubs]);

  return (
    <div style={{ paddingLeft: "5px", margin: "4px" }}>
      <span className="fontBold">subscribers status: </span>
      {listOfSub.length >= 1 ? <ul>{listOfSub}</ul> : <span>no subscribers</span>}
    </div>
  );
}
