import React from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../state-provider/DataLayer";
import CardList from "../card/CardList";

import "./List.css";

export default function List() {
  const [{ list }] = useDataLayerValue();
  return (
    <div className="list">
      {list.length > 0 ? (
        list.map((l, x) => (
          <CardList
            key={x}
            index={x}
            id={l.pokemon.id}
            nickname={l.nickname}
            name={l.pokemon.name}
            image={`https://pokeres.bastionbot.org/images/pokemon/${l.pokemon.id}.png`}
          />
        ))
      ) : (
        <div className="empty__list">
          <h4 style={{ textAlign: "center" }}>Oops Your list empty</h4>
          <p>Please Add Your Pokemon List Before</p>
          <Link to="/">
            <button className="link__button">Start Pick Pokemon</button>
          </Link>
        </div>
      )}
    </div>
  );
}
