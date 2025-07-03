import { Provider } from "react-redux";
import "./App.css";

import { store } from "./store/store";
import Home from "./pages/home";
import { makeServer } from "./server/apiMockServer";

const App = () => {
  makeServer();

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
