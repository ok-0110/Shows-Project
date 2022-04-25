import React, { useState, useEffect } from "react";
import SubscriptionsTOShow from "./SubscriptionsTOShow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { companyServer, subscriptionServer } from "../../URL";


export default function Show(props) {
  const navigate = useNavigate();
  const [reload, setReload] = props.setReload;
  const date = props.data.Premiered.slice(0, 4);
  const canDelete = JSON.parse(sessionStorage.getItem("canDelete"));

  const randomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const [random1, setrandom1] = useState(randomNumbers(-10, 10));
  const [random2, setrandom2] = useState(randomNumbers(-10, 10));

  const edit = () => {
    navigate(`/shows/editshow/${props.data._id}`);
  };

  const deleteShow = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.Name}?`)) {
      // delet show
      await axios.delete(`${subscriptionServer}/shows/${props.data._id}`);

      //delet Show from subs
      const { data: SubsFromDb } = await axios.get(`${subscriptionServer}/subscribers`);

      SubsFromDb.forEach((element) => {
        element.Shows.forEach(async (el) => {
          if (el.showId === props.data._id) {
            console.log(el.showId);
            console.log(props.data._id);
            console.log(element.MemberId);

            delete (await axios.put(
              `${subscriptionServer}/subscribers/removeShow/${element.MemberId}/${props.data._id}`
            ));
          }
        });
      });

      //reload
      setReload(!reload);
    }
  };

  return (
    // <div  className="note" style={{ paddingLeft: "5px", border: "1px solid black", margin: "4px" }}>
    //  <div className="show" style={testi}>
    <div
      className="show"
      style={{
        boxShadow: ` ${random1}px ${random2}px 1px #95a4ff, ${random1}px ${random2}px 1px 1px black`,
      }}
    >
      <span className="fontBolder" style={{ fontSize: "17px" }}>
        {props.data.Name} ,{" "}
      </span>
      <span> {date}</span> <br />
      <span className="fontBold">Genres: </span>
      <span>{`"${props.data.Genres.join('", "')}" `}</span> <br />
      <div style={{ display: "flex" }}>
        <img className="itsImg" src={props.data.Image} alt={`of ${props.data.Name}`} height="100" />
        <div style={{ paddingLeft: "20px" }}>
          <SubscriptionsTOShow showId={props.data._id} />
          <br />
          <button onClick={edit} className="edit" role="button">
            <span className="text">Edit</span>
          </button>
          &nbsp; &nbsp;
          {canDelete ? (
            <button onClick={deleteShow} className="delete" role="button">
              <span className="text">Delete</span>
            </button>
          ) : null}
        </div>
      </div>
      <br />
    </div>
  );
}
