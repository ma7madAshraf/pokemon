const reducer = (state, action) => {
  if (action.type === "GET_ALL_LIST") {
    return { ...state, allPokeList: action.payload };
  }
  if (action.type === "UPDATE_LIST") {
    const updatedList = state.allPokeList.filter((poke) => {
      return poke.name.includes(action.payload);
    });
    return { ...state, filteredList: updatedList };
  }
  if (action.type === "CHOOSE_POKEMON") {
    return { ...state, thePokemon: action.payload };
  }
};
export default reducer;
