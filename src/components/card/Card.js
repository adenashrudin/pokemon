import React from "react";
import { useHistory } from "react-router-dom";

import { useDataLayerValue } from "../../state-provider/DataLayer";
import "./Card.css";

export default function Card({ img, name, abilities, id }) {
  const [{ pokemons }, dispatch] = useDataLayerValue();
  const history = useHistory();

  const addList = () => {
    const pokemon = pokemons.filter((f) => f.id === id)[0];
    dispatch({
      type: "SET_MODAL",
      modal: true,
    });
    dispatch({
      type: "SET_POKEMON_SELECTED",
      pokemonSelected: pokemon,
    });
  };

  const detail = () => {
    history.push(`detail/${id}`);
  };

  return (
    <div className="card">
      <div className="card__image" onClick={detail}>
        <img src={img} alt={name} />
        <p>{name}</p>
      </div>
      <div className="card__detail">
        <p className="card_detailTitle">Abilty</p>
        <p className="card__detailAbility">
          {abilities.map((ability) => ability.ability.name)}
        </p>
      </div>

      <div className="btn__pickme">
        <button onClick={addList}>Add List</button>
      </div>
    </div>
  );
}
