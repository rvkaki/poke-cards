import axios from "axios";
import { getCard } from "../util/apiCalls";

jest.mock("axios");
const mockedAxios = axios.get;
const mockedConsole = jest.spyOn(global.console, "error");
const mockData = require("./mockData.json");

describe("getCard() Source data so we can consume it", () => {
  beforeEach(() => {
    mockedAxios.mockReset();
    mockedConsole.mockReset();
  });

  describe("getCard()", () => {
    it("Should get api data", async () => {
      mockedAxios.mockResolvedValueOnce({ data: [{ test: "Hi I worked!" }] });
      await getCard();
      expect(mockedAxios).toBeCalledTimes(1);
    });

    it("Should get data from the api", async () => {
      mockedAxios.mockResolvedValueOnce({ data: mockData });
      const data = await getCard("xy6-28");
      expect(mockedAxios).toBeCalledTimes(1);
      expect(data.card).toEqual(expect.objectContaining({ id: mockData.card.id }));
    });

    it("Should return null array if no data was recieved", async () => {
      mockedAxios.mockResolvedValueOnce({ data: null });
      const data = await getCard();
      expect(mockedAxios).toBeCalledTimes(1);
      expect(data).toEqual(null);
    });

    it("Should log an error if the request was unsuccessful", async () => {
      const error = new Error("there was an error");
      mockedAxios.mockRejectedValue(error);

      await getCard();

      expect(mockedAxios).toBeCalledTimes(1);
      expect(mockedConsole).toBeCalledTimes(1);
      expect(mockedConsole).toBeCalledWith(error);
    });
  });
});
