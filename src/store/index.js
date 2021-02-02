import { createStore } from "redux";
import reducer from "./reducers/cards";

const store = createStore(reducer);

export default store;
