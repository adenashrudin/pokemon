import React from "react";
import { useHistory } from "react-router-dom";

import { useDataLayerValue } from "../../state-provider/DataLayer";
import "./CardList.css";

export default function CardList({ id, nickname, name, image, index }) {
  const [{}, dispatch] = useDataLayerValue();

  const history = useHistory();

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_LIST",
      index: index,
    });
  };

  return (
    <div className="cardList">
      <div className="content">
        <div
          className="content__left"
          onClick={() => history.push(`/detail/${id}`)}
        >
          <img src={image} alt={`pokemon-${name}`} />
        </div>

        <div className="content__right">
          <div className="content__rightInfo">
            <p>Name : {name}</p>
            <p>Nickname : {nickname}</p>
          </div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}
