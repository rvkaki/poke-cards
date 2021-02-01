import axios from "axios";

export const getCards = async (name = "", page = 1) => {
  try {
    const res = await axios.get(`https://api.pokemontcg.io/v1/cards`, {
      params: {
        name: name,
        page: page,
      },
    });
    if (res.data) return { ...res.data, ...res.headers };
    else return { cards: [], ...res.headers };
  } catch (error) {
    console.error(error);
  }
};

export const getCard = async (id) => {
  try {
    const res = await axios.get(`https://api.pokemontcg.io/v1/cards/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSet = async (id) => {
  try {
    const res = await axios.get(`https://api.pokemontcg.io/v1/sets/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
