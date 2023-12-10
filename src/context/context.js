import { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

const initialState = {
  allPokeList: [],
  filteredList: [],
  thePokemon: {},
};

const PokeContext = createContext();
const PokeProvider = ({ children }) => {
  useEffect(() => {}, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  //get all pokemons
  const getAllList = async () => {
    try {
      const resp = await axios(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );
      const allList = resp.data.results;
      dispatch({ type: "GET_ALL_LIST", payload: allList });
    } catch (error) {
      console.log(error);
    }
  };

  //update filtered list
  const updateList = (poke) => {
    dispatch({ type: "UPDATE_LIST", payload: poke });
  };

  // choose pokemon
  const updatePokemon = async (link) => {
    dispatch({ type: "CHOOSE_POKEMON", payload: link });
  };

  useEffect(() => {
    getAllList();
  }, []);
  return (
    <PokeContext.Provider value={{ ...state, updateList, updatePokemon }}>
      {children}
    </PokeContext.Provider>
  );
};

export { PokeContext, PokeProvider };
