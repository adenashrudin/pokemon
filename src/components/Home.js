import React, { useState } from "react";

import Card from "./card/Card";
import "./Home.css";

import { useDataLayerValue } from "../state-provider/DataLayer";
import Modal from "./modal/Modal";

function Home() {
  const [filter, setFilter] = useState("");

  const [{ pokemons, category, modal }] = useDataLayerValue();

  const filterByCategory = (row) => {
    return row?.filter((f) =>
      f.types.some((s) => s.type.name.indexOf(filter) > -1)
    );
  };

  return (
    <div className="home">
      <div className="container">
        <p>Total Pokemon {filterByCategory(pokemons).length}</p>
        <div className="body">
          <div className="pokemon__category">
            <button onClick={() => setFilter("")}>All</button>
            {category?.map((ctg, x) => (
              <button onClick={() => setFilter(ctg.name)} key={x}>
                {ctg.name}
              </button>
            ))}
          </div>
          <div className="pokemon__card">
            {filterByCategory(pokemons).map((x, i) => (
              <Card
                key={i}
                id={x.id}
                name={x.name}
                abilities={x.abilities}
                img={`https://pokeres.bastionbot.org/images/pokemon/${x.id}.png`}
              />
            ))}
          </div>
          <Modal show={modal} />
        </div>
      </div>
    </div>
  );
}

export default Home;
