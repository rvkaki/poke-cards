import {
  SAVE_PAGE,
  SET_LAST_PAGE,
  SET_PAGE_NUMBER,
  SET_SEARCH_NAME,
} from "../actions/cards";

const initialState = {
  currentPage: 1,
  lastPage: 1,
  searchName: "",
  cards: {},
};

const reducer = (state = initialState, action) => {
  let newCards;
  switch (action.type) {
    case SAVE_PAGE:
      newCards = { ...state.cards };
      newCards[action.number] = [...action.cards];
      return { ...state, cards: newCards };
    case SET_PAGE_NUMBER:
      return { ...state, currentPage: action.number };
    case SET_LAST_PAGE:
      return { ...state, lastPage: action.number };
    case SET_SEARCH_NAME:
      return { ...state, searchName: action.name };
    default:
      return state;
  }
};

export default reducer;
