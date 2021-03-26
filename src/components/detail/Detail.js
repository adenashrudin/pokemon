import React, { useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";

import FavoriteIcon from "@material-ui/icons/Favorite";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import FlashAutoIcon from "@material-ui/icons/FlashAuto";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import SecurityIcon from "@material-ui/icons/Security";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import TimelineIcon from "@material-ui/icons/Timeline";

import { useDataLayerValue } from "../../state-provider/DataLayer";
import Modal from "../modal/Modal";

export default function Detail() {
  const { id } = useParams();
  const [{ pokemons, modal }, dispatch] = useDataLayerValue();

  const [pokemon, setPokemon] = useState(
    pokemons.filter((f) => f.id === parseInt(id))[0]
  );

  const handleAddList = () => {
    console.log("im here");
    console.log(modal);
    dispatch({
      type: "SET_MODAL",
      modal: true,
    });
    dispatch({
      type: "SET_POKEMON_SELECTED",
      pokemonSelected: pokemon,
    });
  };

  return (
    <div className="detail">
      <div className="pokemon__img">
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          alt={`pokemon-${pokemon.name}`}
        />
        <button onClick={handleAddList}>Add List</button>
      </div>

      <div className="pokemon__detail">
        <h1>
          {pokemon.name}/
          <span>
            Types(
            {pokemon.types.map((type, index) => {
              return (
                <span key={index}>{`${type.type.name}${
                  pokemon.types.length - 1 !== index ? "," : ""
                }`}</span>
              );
            })}
            {")"}
          </span>
        </h1>
        <div className="pokemon__info">
          <div className="pokemon__stats">
            <h4>Stats</h4>
            <div className="pokemon__infoStats__card">
              {pokemon.stats.map((p, index) => (
                <div className="pokemon__infoStats" key={index}>
                  {(() => {
                    switch (p.stat.name.toLowerCase()) {
                      case "attack":
                        return <FlashOnIcon />;
                      case "defense":
                        return <SecurityIcon style={{ color: "lightblue" }} />;
                      case "hp":
                        return (
                          <FavoriteIcon style={{ color: "rgb(3, 172, 14)" }} />
                        );
                      case "speed":
                        return <TrendingUpIcon style={{ color: "#F9A26C" }} />;
                      case "special-attack":
                        return <FlashAutoIcon style={{ color: "#F26627" }} />;
                      case "special-defense":
                        return (
                          <VerifiedUserIcon style={{ color: "#325D79" }} />
                        );
                      case "accuracy":
                        return <GpsFixedIcon style={{ color: "#4AB19D" }} />;
                      case "evasion":
                        return <TimelineIcon style={{ color: "#344E5C" }} />;
                      default:
                        return "#FFFFFF";
                    }
                  })()}

                  <p className="infoStats__name">{p.stat.name}</p>
                  <p>
                    <b>{p.base_stat}</b>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pokemon__moves">
          <h4>
            Moves :
            {pokemon.moves.map((move, index) => {
              return (
                <span key={index}>{` ${move.move.name}${
                  pokemon.moves.length - 1 !== index ? "," : ""
                }`}</span>
              );
            })}{" "}
          </h4>
        </div>
        <Modal show={modal} />
      </div>
    </div>
  );
}
