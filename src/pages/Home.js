import React, { useContext, useState } from "react";
import PokeBall from "../imgs/Pokemon.png";
import { PokeContext } from "../context/context";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [poke, setPoke] = useState("");
  const { updateList, filteredList, updatePokemon } = useContext(PokeContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(poke);
  };
  const choosePokemon = async (url) => {
    const resp = await axios(url);
    updatePokemon(resp.data);
  };
  return (
    <div className="home">
      <div className="search-container">
        <img src={PokeBall} alt="icon" />
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter pokemon name ..."
            value={poke}
            onChange={(e) => setPoke(e.target.value)}
          />
          <Button variant="primary" type="submit" className="search-btn">
            search
          </Button>
        </form>
      </div>
      {filteredList.length > 0 && (
        <div className="results">
          {filteredList.map((poke) => {
            const { name, url } = poke;
            const pokeId = url.match(/\d/g).slice(1).join("");
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
            return (
              <Card style={{ width: "20vw" }} className="pokemon" key={name}>
                <Card.Title>{name}</Card.Title>
                <Card.Img variant="top" src={imgUrl} />
                <Card.Body>
                  <Link
                    to="/info"
                    key={name}
                    onClick={() => choosePokemon(url)}
                  >
                    <Button variant="primary">Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
