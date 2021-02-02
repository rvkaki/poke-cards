export const SAVE_PAGE = "SAVE_PAGE";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const SET_LAST_PAGE = "SET_LAST_PAGE";
export const SET_SEARCH_NAME = "SET_SEARCH_NAME";

export const savePage = (number, cards) => {
  return {
    type: SAVE_PAGE,
    number: number,
    cards: cards,
  };
};

export const setPageNumber = (number) => {
  return {
    type: SET_PAGE_NUMBER,
    number: number,
  };
};

export const setLastPage = (number) => {
  return {
    type: SET_LAST_PAGE,
    number: number,
  };
};

export const setSearchName = (name) => {
  return {
    type: SET_SEARCH_NAME,
    name: name,
  };
};
