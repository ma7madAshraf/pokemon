import React, { useContext, useState } from "react";
import pokeCard from "../imgs/pokemonCard.png";
import { PokeContext } from "../context/context";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PokeBall from "../imgs/Pokemon.png";
import Loading from "../components/Loading";

const SinglePoke = () => {
  const [isFlipped, setIsFlipped] = useState(true);
  const { thePokemon } = useContext(PokeContext);
  const frontView = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${thePokemon.id}.png`;
  const backView = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${thePokemon.id}.png`;
  if (thePokemon.name) {
    return (
      <div className="about">
        <img src={PokeBall} alt="icon" className="poke-title" />
        <div
          className={isFlipped ? `flip poke-card` : `poke-card`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="face front">
            <div className="card-header">
              <p className="poke-name">{thePokemon.name}</p>
              {thePokemon.stats && (
                <p className="poke-hp">
                  <span>{thePokemon.stats[0].stat.name} </span>
                  {thePokemon.stats[0].base_stat}
                </p>
              )}
            </div>

            <div className="image">
              <img src={frontView} alt="poke img" />
              <img src={backView} alt="poke img" />
            </div>

            <div className="type">
              {thePokemon.types &&
                thePokemon.types.map((type, index) => {
                  return <h3 key={index}>{type.type.name}</h3>;
                })}
            </div>

            <div className="abilities">
              {thePokemon.abilities &&
                thePokemon.abilities.map((ab, index) => {
                  return <h4 key={index}> {ab.ability.name}</h4>;
                })}
            </div>
            <div className="stats">
              {thePokemon.stats &&
                thePokemon.stats.map((stat, index) => {
                  return (
                    <p key={index}>
                      {stat.stat.name.length > 12
                        ? stat.stat.name.replace("special", "Sp")
                        : stat.stat.name}
                      : {stat.base_stat}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="face back">
            <div className="image">
              <img src={pokeCard} alt="" />
            </div>
          </div>
        </div>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="about">
        <img src={PokeBall} alt="icon" className="poke-title" />
        <Loading />
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    );
  }
};

export default SinglePoke;
