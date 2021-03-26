import React from "react";
import { useDataLayerValue } from "../../state-provider/DataLayer";

import { Link } from "react-router-dom";

import pokemonIcon from "../../pokemon.svg";
import pokemonLogo from "./pokemon-logo.svg";
import "./Header.css";

export default function Header() {
  const [{ list }] = useDataLayerValue();
  return (
    <Link className="nav" to="/list">
      <div className="pokemon__logo">
        <Link to="/">
          <img src={pokemonLogo} alt="pokemon-logo" />
        </Link>
      </div>
      <div className="pokemon__list">
        <img src={pokemonIcon} alt="pokemon-icon" />
        <p>My Pokemon List {list.length} </p>
      </div>
    </Link>
  );
}
