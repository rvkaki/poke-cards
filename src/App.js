import { Provider } from "react-redux";
import Root from "./routes/Root";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
