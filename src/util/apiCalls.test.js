import axios from "axios";
import { getCards } from "./apiCalls";

jest.mock("axios");
const mockedAxios = axios.get;
const mockedConsole = jest.spyOn(global.console, "error");
const mockData = require("./mockData.json");

describe("getCards() Source data so we can consume it", () => {
  beforeEach(() => {
    mockedAxios.mockReset();
    mockedConsole.mockReset();
  });

  describe("getCards()", () => {
    it("Should get api data", async () => {
      mockedAxios.mockResolvedValueOnce({ data: [{ test: "Hi I worked!" }] });
      await getCards();
      expect(mockedAxios).toBeCalledTimes(1);
    });

    it("Should get data from the api", async () => {
      mockedAxios.mockResolvedValueOnce({ data: mockData });
      const data = await getCards();
      expect(mockedAxios).toBeCalledTimes(1);
      expect(data.cards[0]).toEqual(
        expect.objectContaining({ id: mockData.cards[0].id })
      );
    });

    it("Should get data using parameters", async () => {
      const params = {
        name: "Natu",
        page: 1,
      };

      mockedAxios.mockResolvedValueOnce({
        data: { cards: [mockData.cards[0]] },
      });
      const data = await getCards(params.name, params.page);
      expect(mockedAxios).toBeCalledTimes(1);
      expect(mockedAxios).toBeCalledWith("https://api.pokemontcg.io/v1/cards", {
        params: {
          name: params.name,
          page: params.page,
        },
      });
      expect(data.cards[0]).toEqual(expect.objectContaining({ name: "Natu" }));
    });

    it("Should return an empty array if no data was recieved", async () => {
      mockedAxios.mockResolvedValueOnce({ data: null });
      const data = await getCards();
      expect(mockedAxios).toBeCalledTimes(1);
      expect(data.cards).toEqual([]);
    });

    it("Should log an error if the request was unsuccessful", async () => {
      const error = new Error("there was an error");
      mockedAxios.mockRejectedValue(error);

      await getCards();

      expect(mockedAxios).toBeCalledTimes(1);
      expect(mockedConsole).toBeCalledTimes(1);
      expect(mockedConsole).toBeCalledWith(error);
    });
  });
});
