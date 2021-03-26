export const initialState = {
  list: [],
  pokemons: null,
  category: null,
  modal: false,
  pokemonSelected: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_POKEMON":
      return {
        ...state,
        pokemons: action.pokemons,
      };

    case "SET_POKEMON_SELECTED":
      return {
        ...state,
        pokemonSelected: action.pokemonSelected,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.category,
      };

    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal,
      };

    case "ADD_LIST":
      return {
        ...state,
        list: [...state.list, action.list],
      };

    case "REMOVE_LIST":
      // const index = state.list.findIndex(
      //   (listPokemon) => listPokemon.pokemon.id === action.id
      // );
      // console.log("index ", index);
      let newList = [...state.list];
      // if (index >= 0) {
      newList.splice(action.index, 1);
      // } else {
      //   console.warn(`Cant remove product (id :${action.id} as a basket)`);
      // }
      return {
        ...state,
        list: newList,
      };

    default:
      return state;
  }
};

export default reducer;
