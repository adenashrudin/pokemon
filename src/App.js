import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/detail/Detail";
import { useDataLayerValue } from "./state-provider/DataLayer";

import Home from "./components/Home";
import List from "./components/list/List";
import axios from "axios";
import Header from "./components/header/Header";
import loadingPokemon from "./loading-poke.gif";

function App() {
  const [loading, setLoading] = useState(true);
  const [{ category }, dispatch] = useDataLayerValue();

  const getCategory = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        dispatch({
          type: "SET_CATEGORY",
          category: res.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getData = async () => {
      var arrData = [];
      await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
        .then((res) => {
          res.data.results.map((result) =>
            axios
              .get(result.url)
              .then((res) => {
                arrData.push(res.data);
              })
              .catch((err) => {
                console.log(err);
              })
          );
          dispatch({
            type: "SET_DATA_POKEMON",
            pokemons: arrData,
          });

          setTimeout(() => {
            setLoading(false);
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
    getCategory();
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div
            style={{
              height: "100vh",
              margin: " auto 0",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <img
              src={loadingPokemon}
              alt="loading-pokemon"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                objectFit: "content",
              }}
            />
          </div>
        ) : (
          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route exact path="/detail/:id">
              <Header />

              <Detail />
            </Route>
            <Route exact path="/list">
              <Header />
              <List />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
