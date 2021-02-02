import axios from "axios";
import store from "../store";
import { savePage, setLastPage } from "../store/actions/cards";

/**
 * extract info from headers' link attribute
 * returns { last: number, next: number }
 */
const splitLink = (text) => {
  let res = {};
  const l = text.split(",");

  l.forEach((x) => {
    /* rel: rel=\"next\" */
    const [link, rel] = x.split(";");
    const page = parseInt(link.match(/page=(\d+)/)[1]);
    const key = rel.match(/"(\w+)"/)[1];
    res[key] = page;
  });

  return res;
};

export const getCards = async () => {
  const { searchName, cards, currentPage } = store.getState();
  // checks store and returns cards if they exist in it
  if (searchName === "" && cards[currentPage]) return cards[currentPage];
  else
    try {
      const res = await axios.get(`https://api.pokemontcg.io/v1/cards`, {
        params: {
          name: searchName,
          page: currentPage,
        },
      });
      if (res.data) {
        // Only store in state if there's no search name
        if (searchName === "")
          store.dispatch(savePage(currentPage, res.data.cards));
        let l = splitLink(res.headers.link);
        if (l.last) store.dispatch(setLastPage(l.last));
        return res.data.cards;
      } else return [];
    } catch (error) {
      console.error("Error: ", error);
    }
};

export const getCard = async (id) => {
  try {
    const res = await axios.get(`https://api.pokemontcg.io/v1/cards/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSet = async (id) => {
  try {
    const res = await axios.get(`https://api.pokemontcg.io/v1/sets/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
